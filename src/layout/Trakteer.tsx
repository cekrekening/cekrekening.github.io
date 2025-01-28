import { useEffect } from "react";

export default function Trakteer() {
  useEffect(() => {
    if (document.getElementById("trakteer-script")) {
      return;
    }

    const script1 = document.createElement("script");
    script1.src =
      "https://edge-cdn.trakteer.id/js/trbtn-overlay.min.js?v=24-01-2025";
    script1.type = "text/javascript";
    script1.async = true;
    script1.id = "trakteer-script";

    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.className = "troverlay";
      script2.innerHTML = `
        (function() {
          var trbtnId = trbtnOverlay.init(
            'Dukung Saya di Trakteer',
            '#be1e2d',
            'https://trakteer.id/heirro/tip/embed/modal',
            'https://edge-cdn.trakteer.id/images/embed/trbtn-icon.png?v=24-01-2025',
            '35',
            'floating-right'
          );
          trbtnOverlay.draw(trbtnId);
        })();
      `;
      document.body.appendChild(script2);
    };

    document.body.appendChild(script1);

    return () => {
      // Remove scripts when the component unmounts
      const script1 = document.getElementById("trakteer-script");
      if (script1) {
        document.body.removeChild(script1);
      }
      const script2 = document.querySelector(".troverlay");
      if (script2) {
        document.body.removeChild(script2);
      }
    };
  }, []);

  return <div id="trakteer-button"></div>;
}
