# GitHub Pages + 가비아 도메인 연결 가이드

## 1단계: GitHub 저장소 생성

1. GitHub에 로그인 후 https://github.com/new 접속
2. Repository name: `korea-jobportal`
3. Description: `한국 정부 채용공고 포털 - korea-jobportal.co.kr`
4. Public으로 설정 (GitHub Pages는 Public에서만 무료)
5. Add README file 체크 해제 (이미 만들어져 있음)
6. "Create repository" 클릭

## 2단계: 코드 업로드

터미널에서 다음 명령어 실행:

```bash
# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "한국 정부 채용공고 포털 초기 버전"

# GitHub 저장소와 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/korea-jobportal.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 3단계: GitHub Pages 설정

1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. Source: **Deploy from a branch** 선택
4. Branch: **main** 선택, Folder: **/ (root)** 선택
5. **Save** 클릭
6. 몇 분 후 `https://[사용자명].github.io/korea-jobportal` 주소로 접속 가능

## 4단계: 가비아 도메인 연결

### GitHub에서 Custom Domain 설정:
1. GitHub 저장소 → Settings → Pages
2. **Custom domain**에 `korea-jobportal.co.kr` 입력
3. **Save** 클릭
4. **Enforce HTTPS** 체크박스 활성화

### 가비아에서 DNS 설정:
1. **가비아 로그인** → My가비아 → 서비스 관리
2. **DNS 관리** → 레코드 수정
3. 다음 레코드들 추가/수정:

**A 레코드 (4개 모두 추가):**
- 호스트: `@` → 값: `185.199.108.153`
- 호스트: `@` → 값: `185.199.109.153`  
- 호스트: `@` → 값: `185.199.110.153`
- 호스트: `@` → 값: `185.199.111.153`

**CNAME 레코드:**
- 호스트: `www` → 값: `[사용자명].github.io`

## 5단계: CNAME 파일 생성

GitHub 저장소 루트에 CNAME 파일 추가:

```bash
# CNAME 파일 생성
echo "korea-jobportal.co.kr" > CNAME

# 커밋 후 푸시
git add CNAME
git commit -m "Add custom domain CNAME"
git push
```

## 6단계: 최종 확인

- **도메인 전파 시간**: 1-24시간 소요
- **SSL 인증서**: GitHub이 자동 발급 (Let's Encrypt)
- **접속 테스트**: https://korea-jobportal.co.kr
- **전파 확인**: https://whatsmydns.net

## 주의사항

⚠️ **GitHub Pages 제한사항:**
- **정적 사이트만 지원** (Node.js 서버 실행 불가)
- **데이터베이스 연결 불가**
- **서버사이드 스크래핑 불가**

현재 프로젝트는 Node.js 서버가 필요하므로 다음 중 선택:
1. **Vercel/Netlify** (추천) - 서버 기능 포함
2. **GitHub Pages** - 정적 버전만 배포
3. **클라우드 서버** - 완전한 서버 환경

# Vercel + 가비아 도메인 연결 완전 가이드

## 1단계: GitHub 저장소 생성 및 업로드

1. **GitHub 저장소 생성**
   - https://github.com/new 접속
   - Repository name: `korea-jobportal`
   - Description: `한국 정부 채용공고 포털 - korea-jobportal.co.kr`
   - Public 선택
   - "Create repository" 클릭

2. **코드 업로드** (Replit 터미널에서)
   ```bash
   git add .
   git commit -m "한국 정부 채용공고 포털 초기 버전"
   git remote add origin https://github.com/[사용자명]/korea-jobportal.git
   git push -u origin main
   ```

## 2단계: Vercel 배포

1. **Vercel 프로젝트 생성**
   - https://vercel.com/dashboard 접속
   - "New Project" 클릭
   - "Import Git Repository" → `korea-jobportal` 선택
   - "Import" 클릭

2. **배포 설정**
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **환경 변수 설정**
   ```
   DATABASE_URL = [현재 Neon Database URL]
   NODE_ENV = production
   ```

4. **Deploy** 클릭

## 3단계: Vercel 도메인 정보 확인

배포 완료 후:
1. **Project Settings** → **Domains**
2. 기본 도메인 확인: `your-project.vercel.app`
3. **Add Domain** 클릭
4. `korea-jobportal.co.kr` 입력
5. **Add** 클릭
6. DNS 설정 지시사항 화면 캡처/기록

## 4단계: 가비아 DNS 설정

1. **가비아 로그인**
   - https://gabia.com → My가비아
   - 서비스 관리 → 도메인 관리

2. **DNS 레코드 설정**
   - DNS 설정/관리 → 레코드 수정
   
   **A 레코드 설정:**
   - 호스트: `@` → 값: `76.76.19.19` (Vercel IP)
   
   **CNAME 레코드 설정:**
   - 호스트: `www` → 값: `your-project.vercel.app`

3. **저장 및 적용**

## 5단계: 최종 확인 및 테스트

1. **DNS 전파 확인** (1-24시간 소요)
   - https://whatsmydns.net 에서 도메인 전파 상태 확인

2. **접속 테스트**
   - https://korea-jobportal.co.kr
   - https://www.korea-jobportal.co.kr

3. **기능 테스트**
   - 채용공고 목록 로딩 확인
   - 검색/필터 기능 확인
   - 실시간 통계 확인

## 배포 완료 체크리스트

✅ GitHub 저장소 생성 및 코드 업로드  
✅ Vercel 프로젝트 생성 및 배포  
✅ 환경 변수 설정 (DATABASE_URL)  
✅ 가비아 DNS A/CNAME 레코드 설정  
✅ SSL 인증서 자동 적용  
✅ 도메인 접속 및 기능 테스트  

## 주의사항

1. **DNS 전파 시간**: 최대 24시간 소요
2. **환경 변수**: DATABASE_URL이 정확해야 스크래핑 작동
3. **SSL 인증서**: Vercel이 자동 발급 (Let's Encrypt)

## 문제 해결

### Vercel 배포 실패
- Build 로그 확인
- Node.js 버전 확인 (18+ 필요)
- package.json 스크립트 검증

### 도메인 연결 안 됨
- DNS 전파 대기 (최대 24시간)
- 가비아 DNS 레코드 재확인
- Vercel 도메인 설정 재확인

### 데이터베이스 연결 오류
- Vercel 환경 변수 DATABASE_URL 확인
- Neon Database 연결 상태 확인