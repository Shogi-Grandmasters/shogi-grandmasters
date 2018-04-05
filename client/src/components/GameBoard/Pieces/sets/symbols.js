import React from 'react';

let rect = <rect x="11.51" y="17.61" width="24.03" height="24.03" style={{ fill: 'none', stroke: '', miterLimit: 10, strokeWidth: '0.25px' }} />;

const Symbols = (palette, piece) => {
  const sym = {
    King: {},
    Bishop: {},
    Rook: {},
    Gold: {},
    Silver: {},
    Knight: {},
    Lance: {},
    Pawn: {},
  }
  sym.King.default =
    <g id="King">
      <polygon points="23.51 7.97 36.32 10.79 23.57 4.79 10.73 10.76 23.51 7.97" style={{ fill: palette.text }} />
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="27.53" y1="29.63" x2="37.55" y2="29.63" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="26.36" y1="32.46" x2="33.44" y2="39.55" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="23.52" y1="33.64" x2="23.52" y2="43.66" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="32.46" x2="13.6" y2="39.55" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="19.51" y1="29.63" x2="9.5" y2="29.63" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
    </g>;
  sym.Bishop.default =
    <g id="Bishop">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="26.36" y1="32.46" x2="33.44" y2="39.55" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="32.46" x2="13.6" y2="39.55" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <polygon points="34.08 19.07 29.61 18.58 34.58 23.54 34.08 19.07" style={{ fill: palette.text }} />
      <polygon points="34.08 40.19 34.58 35.72 29.61 40.68 34.08 40.19" style={{ fill: palette.text }} />
      <polygon points="12.96 40.19 17.43 40.68 12.47 35.72 12.96 40.19" style={{ fill: palette.text }} />
      <polygon points="12.97 19.07 12.47 23.54 17.44 18.58 12.97 19.07" style={{ fill: palette.text }} />
    </g>;
  sym.Bishop.promoted =
    <g id="Bishop_P" data-name="Bishop P">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.promoted }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="27.53" y1="29.63" x2="37.55" y2="29.63" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="26.36" y1="32.46" x2="33.44" y2="39.55" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="23.52" y1="33.64" x2="23.52" y2="43.66" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="20.69" y1="32.46" x2="13.6" y2="39.55" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="19.51" y1="29.63" x2="9.5" y2="29.63" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <polygon points="34.08 19.07 29.61 18.58 34.58 23.54 34.08 19.07" style={{ fill: palette.promoted }}  />
      <polygon points="34.08 40.19 34.58 35.72 29.61 40.68 34.08 40.19" style={{ fill: palette.promoted }}  />
      <polygon points="12.96 40.19 17.43 40.68 12.47 35.72 12.96 40.19" style={{ fill: palette.promoted }}  />
      <polygon points="12.97 19.07 12.47 23.54 17.44 18.58 12.97 19.07" style={{ fill: palette.promoted }}  />
    </g>;
  sym.Rook.default =
    <g id="Rook">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="27.53" y1="29.63" x2="37.55" y2="29.63" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="23.52" y1="33.64" x2="23.52" y2="43.66" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="19.51" y1="29.63" x2="9.5" y2="29.63" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <polygon points="23.52 14.7 20.01 17.51 27.03 17.51 23.52 14.7" style={{ fill: palette.text }}  />
      <polygon points="38.46 29.63 35.64 26.12 35.64 33.14 38.46 29.63" style={{ fill: palette.text }}  />
      <polygon points="23.52 44.56 27.03 41.75 20.01 41.75 23.52 44.56" style={{ fill: palette.text }}  />
      <polygon points="8.59 29.63 11.4 33.14 11.4 26.12 8.59 29.63" style={{ fill: palette.text }}  />
    </g>;
  sym.Rook.promoted =
    <g id="Rook_P" data-name="Rook P">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.promoted }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="27.53" y1="29.63" x2="37.55" y2="29.63" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="26.36" y1="32.46" x2="33.44" y2="39.55" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="23.52" y1="33.64" x2="23.52" y2="43.66" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="20.69" y1="32.46" x2="13.6" y2="39.55" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="19.51" y1="29.63" x2="9.5" y2="29.63" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <polygon points="23.52 14.7 20.01 17.51 27.03 17.51 23.52 14.7" style={{ fill: palette.promoted }}  />
      <polygon points="38.46 29.63 35.64 26.12 35.64 33.14 38.46 29.63" style={{ fill: palette.promoted }}  />
      <polygon points="23.52 44.56 27.03 41.75 20.01 41.75 23.52 44.56" style={{ fill: palette.promoted }}  />
      <polygon points="8.59 29.63 11.4 33.14 11.4 26.12 8.59 29.63" style={{ fill: palette.promoted }}  />
    </g>;
  sym.Gold.default =
    <g id="Gold">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="27.53" y1="29.63" x2="37.55" y2="29.63" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="23.52" y1="33.64" x2="23.52" y2="43.66" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="19.51" y1="29.63" x2="9.5" y2="29.63" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
    </g>;
  sym.Silver.default =
    <g id="Silver">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="26.36" y1="32.46" x2="33.44" y2="39.55" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="32.46" x2="13.6" y2="39.55" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
    </g>;
  let promotedGoldPattern =
    <g id="promote to gold">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.promoted }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="26.36" y1="26.79" x2="33.44" y2="19.71" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="27.53" y1="29.63" x2="37.55" y2="29.63" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="23.52" y1="33.64" x2="23.52" y2="43.66" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="19.51" y1="29.63" x2="9.5" y2="29.63" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
      <line x1="20.69" y1="26.79" x2="13.61" y2="19.71" style={{ fill: 'none', stroke: palette.promoted, miterLimit: 10 }} />
    </g>;

  sym.Silver.promoted = promotedGoldPattern;
  sym.Pawn.promoted = promotedGoldPattern;
  sym.Lance.promoted = promotedGoldPattern;
  sym.Knight.promoted = promotedGoldPattern;

  sym.Knight.default =
    <g id="knight">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="21.61" y1="26.11" x2="14.9" y2="13.73" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <polygon points="14.21 12.48 12.47 16.63 18.64 13.28 14.21 12.48" style={{ fill: palette.text }}  />
      <line x1="25.52" y1="26.15" x2="32.51" y2="13.94" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
      <polygon points="33.22 12.7 28.78 13.39 34.87 16.88 33.22 12.7" style={{ fill: palette.text }}  />
    </g>;
  sym.Lance.default =
    <g id="Lance">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
    <polygon points="23.52 14.7 20.01 17.51 27.03 17.51 23.52 14.7" style={{ fill: palette.text }}  />
    </g>;
  sym.Pawn.default =
    <g id="Pawn">
      <circle cx="23.52" cy="29.63" r="2.15" style={{ fill: palette.text }} />
      <line x1="23.52" y1="25.62" x2="23.52" y2="15.6" style={{ fill: 'none', stroke: palette.text, miterLimit: 10 }} />
    </g>;
  return sym[piece];
}

export default Symbols;