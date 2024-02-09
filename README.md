# Gloo"

<p align="center">
  <br>
  <img src="./sources/gloo-main.png">
  <br>
</p>

목차

## 프로젝트 소개

<p align="justify">
프로젝트 개요/동기
</p>

<p align="center">
GIF Images
</p>

<br>

## 기술 스택

| Next | TypeScript |  React   |  tailwind CSS   |
| :--------: | :--------: | :------: | :-----: |
|   ![next]    |   ![ts]    | ![react] | ![tailwind] |

<br>

## 담당한 업무
- 팀장
- Front-end Developer (단독)
<br>

## 구현 기능

### setInterval() 함수를 이용한 동적 타이머/글쓰기 기능 구현
- 첫 번째 타이머와 두 번째 타이머를 설정, 각각 글쓰기 시간이 아닐 경우/글쓰기 시간인 경우를 관리

- 1초 단위로 타이머 업데이트, 이에 따른 글쓰기 기능 활성화 여부를 결정

- 타이머가 종료될 경우 사용자에게 모달을 통해 알림 전송/페이지 리로드

### nookies 라이브러리 활용
- Next.js와 호환 가능한 nookies 라이브러리를 통해 클라이언트 측에서 쿠키 관리 및 사용자 정보 추출

- 쿠키에서 가져온 access Token을 이용해 사용자 인증 및 기타 정보 활용

### html2pdf 라이브러리 활용
- 사용자가 목표를 달성했을 경우 html2pdf 라이브러리를 통해 pdf 형식의 전자책을 다운로드할 수 있는 기능 구현


### useEffect() 훅을 활용한 비동기 데이터 처리
- useEffect() 훅을 사용해 비동기 함수 호출 및 상태 업데이트

- 페이지 로드 시에 사용자 정보 & 그에 따른 글쓰기 정보 업데이트 및 렌더링

- 글쓰기 시간에 대한 타이머 제어

### useState() 훅을 활용한 상태 관리
- 모달의 열림/닫힘 여부, 사용자 정보에 따른 글쓰기 내역, 선택된 글의 ID 등에 대한 관리에 활용

### 카카오 소셜 로그인
- 카카오 developers에서 REST API KEY 발급/REDIRECT URI 등록을 통해 카카오 소셜 로그인 링크 생성

- 사용자 인증 후 code를 통해 access Token 발급, 쿠키에 토큰을 저장해 로그인 상태를 유지


<br>

## 배운 점 & 아쉬운 점

<p align="justify">

</p>

<br>

## 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)

<!-- Stack Icon Refernces -->

[next]: ./sources/next.png
[ts]: ./sources/typescript.svg
[react]: ./sources/react.svg
[tailwind]: ./sources/tailwind-5.png
