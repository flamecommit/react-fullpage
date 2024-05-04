## 1.3.3

### Fix

- activate the passive option of touchstart, touchmove.
- multiple "onAfterLoad" runs.

## 1.3.0

### What's New?

- add Props in FullpageContainer : ransitionDuration, 섹션간 이동 속도, type : number, default : 700
- add Props in FullpageContainer : onAfterLoad, 로딩 후 실행 이벤트, arguments : container

## 1.5.0

- 비활성화 섹션은 스크롤이 동작하지 않도록 수정했습니다.

## 1.5.1

- 외부에서 setActiveIndex 사용 시 callback함수가 실행되지 않던 현상을 수정했습니다.

## 1.5.2

- window height값 변경시 container의 transform 값을 조정합니다.

## 1.6.0

- contents 의 높이값 변화를 감지하여 fullpage section, scroll의 상태를 갱신합니다.

## 1.8.0

- allowScroll 값 추가. false일 때 fullpage scroll이 비활성화 됩니다. (기본값 true)

## 1.8.1

- allowScrollUp, allowScrollDown 옵션 추가.

## 1.10.0

- Wheel이벤트에 속력 가중치를 구하여 트랙패드에서 휠이벤트 한번에 섹션이 여러번 이동하는 현상 수정.
