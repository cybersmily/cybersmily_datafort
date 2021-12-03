export enum NrNodeIcons {
  DATAWALL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="black"/></svg>',
  CODEGATE =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                '<rect x="51" y="51" fill="white" stroke="black" stroke-width="50" width="400" height="400" />' +
                '<line x1="31" x2="450" y1="140" y2="140" stroke="black" stroke-width="30" />' +
                '<line x1="31" x2="450" y1="360" y2="360" stroke="black" stroke-width="30" />' +
              '</svg>',
  CPU = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
          '<circle cx="256" cy="256" r="220" stroke="black" stroke-width="50" fill="white" />' +
          '<line x1="31" x2="475" y1="31" y2="475" stroke="black" stroke-width="50" />' +
          '<line x1="31" x2="475" y1="475" y2="31" stroke="black" stroke-width="50" />' +
        '</svg>',
  MU = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
          '<rect x="81" y="31" width="350" height="450" stroke="black" stroke-width="50" fill="white"/>' +
        '</svg>',
  PROGRAM = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">' +
              '<path fill="black" d="M439.15 453.06L297.17 384l141.99-69.06c7.9-3.95 11.11-13.56 7.15-21.46L432 264.85c-3.95-7.9-13.56-11.11-21.47-7.16L224 348.41 37.47 257.69c-7.9-3.95-17.51-.75-21.47 7.16L1.69 293.48c-3.95 7.9-.75 17.51 7.15 21.46L150.83 384 8.85 453.06c-7.9 3.95-11.11 13.56-7.15 21.47l14.31 28.63c3.95 7.9 13.56 11.11 21.47 7.15L224 419.59l186.53 90.72c7.9 3.95 17.51.75 21.47-7.15l14.31-28.63c3.95-7.91.74-17.52-7.16-21.47zM150 237.28l-5.48 25.87c-2.67 12.62 5.42 24.85 16.45 24.85h126.08c11.03 0 19.12-12.23 16.45-24.85l-5.5-25.87c41.78-22.41 70-62.75 70-109.28C368 57.31 303.53 0 224 0S80 57.31 80 128c0 46.53 28.22 86.87 70 109.28zM280 112c17.65 0 32 14.35 32 32s-14.35 32-32 32-32-14.35-32-32 14.35-32 32-32zm-112 0c17.65 0 32 14.35 32 32s-14.35 32-32 32-32-14.35-32-32 14.35-32 32-32z"></path>' +
            '</svg>',
  LDL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
          '<rect x="31" y="31" fill="white" stroke="black" stroke-width="50" width="450" height="450" />' +
          '<polygon points="51,390 256,145 450,390" fill="black" stroke="black" stroke-width="1" />' +
        '</svg>',
  TERMINAL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
               '<rect x="76" y="31" width="250" height="280" stroke="black" stroke-width="50" fill="white"/>' +
               '<rect x="31" y="375" width="350" height="105" stroke="black" stroke-width="50" fill="white"/>' +
               '<line x1="375" x2="475" y1="420" y2="420" stroke="black" stroke-width="50" />' +
             '</svg>',
  MICROPHONE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                 '<circle cx="181" cy="256" r="135" stroke="black" stroke-width="50" fill="white" />' +
                 '<line x1="321" x2="481" y1="256" y2="256" stroke="black" stroke-width="50" />' +
               '</svg>',
  CAMERA = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
             '<rect x="31" y="81" width="350" height="350" stroke="black" stroke-width="50" fill="white"/>' +
             '<rect x="381" y="186" width="100" height="150" stroke="black" stroke-width="50" fill="white"/>' +
           '</svg>',
  HOLODISPLAY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                  '<polygon points="31,56 256,345 466,56" fill="black" stroke="black" stroke-width="1" />' +
                '<svg>',
  VIDEO =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
             '<rect x="51" y="51" fill="white" stroke="black" stroke-width="50" width="400" height="400" />' +
             '<line x1="56" x2="456" y1="56" y2="456" stroke="black" stroke-width="50" />' +
             '<line x1="456" x2="56" y1="56" y2="456" stroke="black" stroke-width="50" />' +
           '</svg>',
  PRINTER = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
              '<polygon points="101,31 352,31 417,131 417,437 101,437" fill="white" stroke="black" stroke-width="50" />' +
              '<line x1="322" x2="322" y1="56" y2="156" stroke="black" stroke-width="30" />' +
              '<line x1="307" x2="417" y1="156" y2="156" stroke="black" stroke-width="30" />' +
            '</svg>',
  VEHICLE =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                '<rect x="31" y="106" fill="white" stroke="black" stroke-width="50" width="450" height="150" />' +
                '<circle cx="131" cy="256" r="50" stroke="black" stroke-width="50" fill="black" />' +
                '<circle cx="381" cy="256" r="50" stroke="black" stroke-width="50" fill="black" />' +
              '</svg>',
  ALARM = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
            '<circle cx="256" cy="256" r="180" stroke="black" stroke-width="50" fill="white" />' +
            '<line x1="236" x2="481" y1="276" y2="31" stroke="black" stroke-width="50" />' +
          '</svg>',
  DOOR =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
            '<rect x="31" y="206" fill="white" stroke="black" stroke-width="50" width="200" height="250" />' +
            '<line x1="226" x2="486" y1="312" y2="181" stroke="black" stroke-width="50" />' +
          '</svg>',
  ELEVATOR = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                '<rect x="116" y="151" fill="white" stroke="black" stroke-width="50" width="280" height="280" />' +
                '<line x1="226" x2="226" y1="31" y2="151" stroke="black" stroke-width="50" />' +
                '<line x1="302" x2="302" y1="6" y2="151" stroke="black" stroke-width="50" />' +
              '</svg>',
  MANIPULATOR =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                   '<line x1="26" x2="125" y1="46" y2="225" stroke="black" stroke-width="50" />' +
                   '<line x1="110" x2="350" y1="220" y2="220" stroke="black" stroke-width="50" />' +
                   '<line x1="350" x2="350" y1="46" y2="370" stroke="black" stroke-width="50" />' +
                   '<line x1="350" x2="500" y1="71" y2="71" stroke="black" stroke-width="50" />' +
                   '<line x1="350" x2="500" y1="345" y2="345" stroke="black" stroke-width="50" />' +
                 '</svg>',
  AUTOFACTORY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
                  '<rect x="31" y="171" width="450" height="150" stroke="black" stroke-width="50" fill="white"/>' +
                  '<rect x="126" y="31" width="100" height="425" stroke="black" stroke-width="50" fill="white"/>' +
                  '<rect x="326" y="56" width="75" height="350" stroke="black" stroke-width="50" fill="white"/>' +
                '</svg>'
}
