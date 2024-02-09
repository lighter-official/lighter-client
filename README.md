# Gloo"

<p align="center">
  <br>
  <img src="./sources/gloo-main.png">
  <br>
</p>


## 프로젝트 소개

<p align="justify">
💡 서비스 기획 배경

***🤦‍♂️: 꾸준히 글쓰고 싶은데 자꾸 다른 일에 밀려서 잘 안돼...***

***🤷‍♀️: 글쓰다가 며칠 못썼더니 하기 싫어졌어...***

이런 경험, 있지 않으셨나요?

글쓰기 습관을 기를 수 있도록,**`'정해진 시간 내에만'** 글을 쓸 수 있는 서비스 **Gloo"`는**

글쓰기를 통해 자기 계발을 하고 싶지만 잘 되지 않는,**`20대 직장인**을 위한 서비스`입니다.

**📢 실제 20대 직장인들의 글쓰기 경험은 이랬어요!**↓↓↓↓↓↓↓↓**🔥글쓰기 습관을 만들어본 직장인**

- 글 쓰는 시간을 정해두면 글쓰기 성공률이 높아진다! (23세 직장인)
- 꾸준히 썼다는 사실이 원동력이 되어 더 글을 잘 쓸 수 있게 된다! (24세 직장인)
- 하나의 콘텐츠를 가지고 글을 쓰는 것이 더 쉽다! (26세 직장인)

💧**글쓰기 습관 형성을 실패했던 직장인**

- 미루다 보니 의지가 사라졌다.. (23세 직장인)
- 매번 글쓰기 소재를 찾는 게 힘들었다.. (23세 직장인)
- 현생에 치여 글쓰기를 잊게 되었다.. (24세 직장인)

**Gloo"는 이런 실제 직장인들의 목소리를 듣고 서비스를 제작했어요.**

갓생(God+生)을 꿈꾸며 글쓰는 사람들을 위해, 포텐데이를 시작으로 꾸준히 사람들의 글쓰기를 도울 기능들을 업데이트할 예정입니다!

<a href="https://gloo-writing.vercel.app">→ Gloo 홈페이지</a>

<a href="https://drive.google.com/file/d/1a8LdmUTysVW7r2axOhe1NpKMdsfFgT3-/view">→ Gloo 시연 영상</a>

<a href="https://lavender-seal-56e.notion.site/e15fe534f65b4c0c934917d8f87e4196">→ Gloo 소개 페이지(노션)</a>

<a href="./sources/[Lighter!] Gloo 서비스 소개.pdf">→ Gloo 보고서</a>

</p>


<br>

## 기술 스택

| Next | TypeScript |  React   |  tailwind CSS   |
| :--------: | :--------: | :------: | :-----: |
|   ![next]    |   ![ts]    | ![react] | ![tailwind] |

<br>

## 진행기간
2024.02
<br>


## 팀 구성원
- 기획 2명
- 디자인 1명
- FE 1명
- BE 1명
<br>

## 담당한 업무
- 팀장
- Front-end Developer (단독)
<br>

## 구현 기능

### setInterval() 함수를 이용한 동적 타이머/글쓰기 기능 구현
- 첫 번째 타이머와 두 번째 타이머를 설정, 사용자가 설정한 글쓰기 시간이 아닐 경우/글쓰기 시간인 경우를 관리해 일정 시간에만 글을 쓸 수 있도록 관리

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

<!--## 배운 점 & 아쉬운 점

<p align="justify">

</p>

<br>

 ## 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)-->

<!-- Stack Icon Refernces -->

[next]: ./sources/next.png
[ts]: ./sources/typescript.svg
[react]: ./sources/react.svg
[tailwind]: ./sources/tailwind-5.png
