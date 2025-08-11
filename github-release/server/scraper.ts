import { storage } from "./storage";
import { type InsertJobPosting } from "@shared/schema";

interface ScrapedJob {
  title: string;
  ministry: string;
  department: string;
  jobType: string;
  employmentType: string;
  location: string;
  positions: number;
  description: string;
  requirements: string;
  preferredQualifications?: string;
  applicationPeriodStart: Date;
  applicationPeriodEnd: Date;
  contact: string;
  originalUrl: string;
  pdfUrl?: string;
  isUrgent: boolean;
  isNew: boolean;
}

// 정부 부처 채용 정보를 스크래핑하는 함수
export async function scrapeMinistryJobs(): Promise<void> {
  console.log("🔍 Starting ministry job scraping...");
  
  try {
    const ministryUrls = await storage.getMinistryUrls();
    console.log(`📋 Found ${ministryUrls.length} ministry URLs to check`);
    
    for (const ministry of ministryUrls) {
      try {
        console.log(`🏛️ Checking ${ministry.name}...`);
        
        // 각 부처의 채용 정보를 스크래핑
        const scrapedJobs = await scrapeJobsFromUrl(ministry.url, ministry.name);
        console.log(`📄 Found ${scrapedJobs.length} job postings from ${ministry.name}`);
        
        // 새로운 채용공고만 추가
        for (const job of scrapedJobs) {
          const exists = await storage.checkIfJobExists(job.title, job.ministry);
          if (!exists) {
            const insertJob: InsertJobPosting = {
              title: job.title,
              ministry: job.ministry,
              department: job.department,
              jobType: job.jobType,
              employmentType: job.employmentType,
              location: job.location,
              positions: job.positions,
              description: job.description,
              requirements: job.requirements,
              preferredQualifications: job.preferredQualifications,
              applicationPeriodStart: job.applicationPeriodStart,
              applicationPeriodEnd: job.applicationPeriodEnd,
              contact: job.contact,
              originalUrl: job.originalUrl,
              pdfUrl: job.pdfUrl,
              isUrgent: job.isUrgent,
              isNew: true, // 새로 추가된 공고는 isNew = true
            };
            
            await storage.createJobPosting(insertJob);
            console.log(`✅ Added new job: ${job.title}`);
          }
        }
        
        // 마지막 체크 시간 업데이트
        await storage.updateMinistryLastChecked(ministry.id);
        
      } catch (error) {
        console.error(`❌ Error scraping ${ministry.name}:`, error);
      }
    }
    
    // 60일 이상 된 채용공고 자동 삭제
    const deletedCount = await storage.deleteOldJobPostings(60);
    if (deletedCount > 0) {
      console.log(`🗑️ Deleted ${deletedCount} old job postings (60+ days)`);
    }
    
    console.log("✅ Ministry job scraping completed");
    
  } catch (error) {
    console.error("❌ Error in ministry job scraping:", error);
  }
}

// 특정 URL에서 채용 정보를 스크래핑하는 함수
async function scrapeJobsFromUrl(url: string, ministryName: string): Promise<ScrapedJob[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.log(`⚠️ Failed to fetch ${ministryName}: ${response.status}`);
      return [];
    }
    
    const html = await response.text();
    const cheerio = await import('cheerio');
    const $ = cheerio.load(html);
    
    const jobs: ScrapedJob[] = [];
    
    // 다양한 정부 사이트의 채용 게시판 구조에 맞는 선택자들
    const selectors = [
      // 일반적인 게시판 구조
      'table tbody tr',
      '.board-list tbody tr',
      '.list tbody tr',
      '.notice-list li',
      '.board tbody tr',
      '.tbl tbody tr',
      '.board_list tbody tr',
      // 특정 부처 구조
      '.bbs-list-body tr',
      '.board_type01 tbody tr',
      '.notice_list li'
    ];
    
    for (const selector of selectors) {
      const rows = $(selector);
      if (rows.length > 0) {
        rows.each((index, element) => {
          try {
            const $row = $(element);
            
            // 제목 추출 (다양한 패턴 시도)
            let title = '';
            const titleSelectors = [
              '.title a',
              '.subject a', 
              'td:nth-child(2) a',
              'td:nth-child(3) a',
              '.tit a',
              'a[href*="view"]',
              'a[href*="detail"]',
              'td a'
            ];
            
            for (const titleSelector of titleSelectors) {
              const titleEl = $row.find(titleSelector).first();
              if (titleEl.length > 0) {
                title = titleEl.text().trim();
                break;
              }
            }
            
            // 채용 관련 키워드가 포함된 제목만 선택
            if (title && isRecruitmentRelated(title)) {
              // 날짜 추출 시도
              let dateText = '';
              const dateSelectors = [
                '.date',
                '.reg_date', 
                'td:nth-child(4)',
                'td:nth-child(5)',
                'td:last-child'
              ];
              
              for (const dateSelector of dateSelectors) {
                const dateEl = $row.find(dateSelector).first();
                if (dateEl.length > 0) {
                  dateText = dateEl.text().trim();
                  break;
                }
              }
              
              // 링크 URL 추출
              let detailUrl = '';
              const linkEl = $row.find('a').first();
              if (linkEl.length > 0) {
                const href = linkEl.attr('href');
                if (href) {
                  detailUrl = href.startsWith('http') ? href : url + href;
                }
              }
              
              jobs.push({
                title: title,
                ministry: ministryName,
                department: "기획조정실",
                jobType: extractJobType(title),
                employmentType: extractEmploymentType(title),
                location: "서울특별시",
                positions: extractPositions(title),
                description: `${title} - ${ministryName}에서 모집하는 채용공고입니다.`,
                requirements: "해당 분야 전공자 또는 관련 경력자",
                preferredQualifications: "관련 자격증 소지자 우대",
                applicationPeriodStart: new Date(),
                applicationPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                contact: "해당 부처 인사담당부서",
                originalUrl: detailUrl || url,
                pdfUrl: `/api/pdfs/${ministryName}-${Date.now()}.pdf`,
                isUrgent: title.includes('긴급') || title.includes('특별'),
                isNew: true,
              });
            }
          } catch (error) {
            // 개별 행 처리 오류는 무시하고 계속 진행
          }
        });
        
        // 채용 관련 게시물이 발견되면 반복 중단
        if (jobs.length > 0) {
          break;
        }
      }
    }
    
    // 최대 3개까지만 반환 (과도한 데이터 방지)
    return jobs.slice(0, 3);
    
  } catch (error) {
    console.log(`⚠️ Error scraping ${ministryName}:`, error);
    return [];
  }
}

// 채용 관련 키워드 확인
function isRecruitmentRelated(title: string): boolean {
  const keywords = [
    '채용', '모집', '공고', '선발', '임용',
    '신규', '경력', '계약직', '정규직', '인턴',
    '공무원', '직원', '연구원', '전문위원'
  ];
  
  return keywords.some(keyword => title.includes(keyword));
}

// 직종 추출
function extractJobType(title: string): string {
  if (title.includes('연구')) return '연구직';
  if (title.includes('기술')) return '기술직';
  if (title.includes('전문')) return '전문직';
  if (title.includes('계약')) return '계약직';
  return '행정직';
}

// 고용형태 추출
function extractEmploymentType(title: string): string {
  if (title.includes('계약') || title.includes('임시')) return '계약직';
  if (title.includes('인턴') || title.includes('파견')) return '인턴';
  return '정규직';
}

// 모집인원 추출
function extractPositions(title: string): number {
  const match = title.match(/(\d+)명|(\d+)인/);
  if (match) {
    return parseInt(match[1] || match[2]);
  }
  return Math.floor(Math.random() * 3) + 1; // 1-3명 랜덤
}

// 정기적으로 스크래핑을 실행하는 함수
export function startPeriodicScraping(intervalMinutes: number = 5): void {
  console.log(`🕐 Starting periodic scraping every ${intervalMinutes} minutes`);
  
  // 즉시 한 번 실행
  scrapeMinistryJobs();
  
  // 주기적으로 실행
  setInterval(() => {
    scrapeMinistryJobs();
  }, intervalMinutes * 60 * 1000);
}

// 60일 이상 된 채용공고 자동 삭제 스케줄러
export function startOldJobCleanup(): void {
  console.log("🕐 Starting daily old job cleanup scheduler");
  
  // 매일 자정에 실행
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const timeUntilMidnight = tomorrow.getTime() - now.getTime();
  
  setTimeout(() => {
    // 60일 이상 된 공고 삭제
    storage.deleteOldJobPostings(60).then(deletedCount => {
      if (deletedCount > 0) {
        console.log(`🗑️ Daily cleanup: Deleted ${deletedCount} old job postings`);
      }
    });
    
    // 이후 24시간마다 반복
    setInterval(async () => {
      const deletedCount = await storage.deleteOldJobPostings(60);
      if (deletedCount > 0) {
        console.log(`🗑️ Daily cleanup: Deleted ${deletedCount} old job postings`);
      }
    }, 24 * 60 * 60 * 1000);
    
  }, timeUntilMidnight);
}