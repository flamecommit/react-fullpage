/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const chokidar = require('chokidar');

const srcDir = 'src'; // 소스 디렉토리
const distDir = 'dist'; // 목적지 디렉토리

// srcDir 내의 모든 CSS 파일 감시
const watcher = chokidar.watch(`${srcDir}/**/*.css`, {
  persistent: true,
});

// 파일이 추가, 변경 또는 삭제될 때 호출되는 콜백 함수
watcher.on('all', (event, path) => {
  console.log(`File ${event}: ${path}`);

  // 파일을 목적지로 복사
  const relativePath = path.replace(srcDir, ''); // 상대 경로 추출

  console.log(relativePath);
  const destPath = `${distDir}${relativePath}`; // 목적지 경로 생성
  fs.copyFile(path, destPath, (err) => {
    if (err) {
      console.error('Error copying file:', err);
    } else {
      console.log(`File ${path} copied to ${destPath}`);
    }
  });
});

console.log(`Watching CSS files in ${srcDir} and copying to ${distDir}`);

// 프로그램 종료 시 감시 중지
process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});
