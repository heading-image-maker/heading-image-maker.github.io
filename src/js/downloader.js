import html2canvas from "html2canvas";

const DEBUG = false;

export default function initDownloader() {
  document.querySelector('#download').onclick = function () {
    const xCoord = window.pageXOffset;
    const yCoord = window.pageYOffset;
    window.scrollTo(0, 0);
    document.querySelector('body').style.overflowY = 'hidden';

    html2canvas(document.querySelector('#canvas'))
      .then(canvas => {
        DEBUG && document.body.appendChild(canvas);

        // for IE11
        if (canvas.msToBlob) {
          const blob = canvas.msToBlob();
          window.navigator.msSaveBlob(blob, 'heading-image.png');
        }

        // for others
        else {
          const data = canvas.toDataURL(); // image/png
          const a = document.createElement('a');
          a.href = data;
          a.download = 'heading-image.png';
          !DEBUG && a.click();
        }

        window.scrollTo(xCoord, yCoord);
        document.querySelector('body').style.overflowY = 'scroll';
      });
  }
}