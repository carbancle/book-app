# 도서 조회 사이트 제작

개발환경

- windows 11
- Visual Studio Code

사용 기술

- HTML
- css
- javascript
- react
- firebase

사이트 제작 방향

- firebase 및 react를 활용한 기능 구현
- 도서 등록 기능
- 도서 상세정보 등록 - 도서 정보, 작가 정보 등의 설명 및 이미지 등록 기능
- 도서 수정 - 등록된 도서 정보, 작가 정보 수정 기능
- 도서 삭제 - 도서 정보, 작가 정보 삭제, 등록된 이미지 파일 삭제, 도서 삭제 기능
- 로그인 기능 - 로그인한 사용자만 도서 등록, 수정, 삭제를 가능하도록 함

사이트 예시
<img src="/img/main_page.png" title="메인 페이지"></img>
</br>
메인 페이지로 등록된 도서 목록을 확인할 수 있다.
</br>
<img src="/img/login.png" title="로그인"></img>
</br>
로그인 페이지이며 상단의 로그인 또는 '책 추가하기', 도서 정보 조회시  
로그인 페이지로 이동한다.
<img src="/img/login_error.png" title="로그인 오류"></img></br>
db에 등록되지 않은 아이디나 잘못된 비밀번호로 로그인 시도시  
다음과 같이 오류를 출력한다.
</br>
<img src="/img/add_book.png" title="신규 도서 추가"></img></br>
로그인 이후 책 추가하기 버튼 클릭시 나오는 모달창으로  
제목, 페이지 수, 출판일 정보 입력 후 저장하기 클릭 시, 데이터가 firebase에 저장되며  
도서 목록에 등록한 도서 정보가 나타난다.
</br>
<img src="/img/modify.png" title="도서 수정"></img></br>
목록에서 도서 제목을 클릭시 확인할 수 있는 페이지로  
기존 등록한 제목, 페이지 수, 출판일 정보 수정이 가능하며  
수정한 내용은 firebase에 반영된다.
</br>
<img src="/img/add_author.png" title="작가 정보"></img></br>
작가 정보를 등록할 수 있는 페이지로  
작가 이름, 사진, 작가 소개 정보를 등록할 수 있고  
작가 추가하기 버튼 클릭 시 firebase에 저장된다.
</br>
<img src="/img/add_picture.png" title="도서 사진 등록"></img></br>
도서 관련 이미지를 저장할 수 있는 페이지로  
클릭 또는 이미지를 사각형 칸으로 드래그하면 상단에 이미지가 추가된다.
</br>
<img src="/img/firebase_db.png" title="firebase DB"></img></br>
도서 사이트에 등록한 도서정보가 실제 firebase에 반영된 정보
</br>
<img src="/img/firebase_user.png" title="firebase 사용자 정보"></img></br>
회원가입을 통해 등록한 회원이 firebase에 반영된 정보
</br>
<img src="/img/firebase_image.png" title="firebase 이미지 정보"></img></br>
도서 사이트에 등록한 이미지가 firebase에 반영된 정보
