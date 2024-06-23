# TDD로 개발하기

point 패키지의 TODO 와 테스트코드를 작성해주세요.

요구 사항

*PATCH* `/point/{id}/charge` : 포인트를 충전한다.<br>
*PATCH* `/point/{id}/use` : 포인트를 사용한다.<br>
*GET* `/point/{id}` : 포인트를 조회한다.<br>
*GET* `/point/{id}/histories` : 포인트 내역을 조회한다.<br>

동시에 여러 건의 포인트 충전, 이용 요청이 들어올 경우 순차적으로 처리되어야 합니다. (동시성)
