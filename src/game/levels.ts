export type AABB = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

export type Prop = {
  t: "box" | "cyl" | "sphere" | "plane" | "torus";
  p: [number, number, number];
  s: [number, number, number];
  r?: [number, number, number];
  c: string;
  e?: string;
  ei?: number;
  m?: number;
  rg?: number;
  solid?: boolean;
  cast?: boolean;
  trans?: number;
  sign?: string;
};

export type Memory = {
  id: string;
  title: string;
  body: string;
  p: [number, number, number];
};

export type Level = {
  id: string;
  name: string;
  index: string;
  blurb: string;
  spawn: { x: number; y: number; z: number; yaw: number };
  sky: { zenith: string; horizon: string; ground: string };
  fog: { color: string; near: number; far: number };
  sun: { position: [number, number, number]; intensity: number; color: string };
  ambient: number;
  hemi: [string, string, number];
  exposure: number;
  floor: {
    w: number;
    d: number;
    cx: number;
    cz: number;
    y: number;
    color: string;
    roughness: number;
    metalness: number;
    mirror: number;
    distortion: number;
    strength: number;
  };
  orbit: [number, number];
  orbitR: number;
  orbitY: number;
  lights: { p: [number, number, number]; color: string; intensity: number; dist: number }[];
  props: Prop[];
  extras: AABB[];
  memories: Memory[];
  portal: { x: number; z: number; to: string; label: string };
  boxes: AABB[];
};

function box(
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  d: number,
  c: string,
  o: Partial<Prop> = {},
): Prop {
  return { t: "box", p: [x, y, z], s: [w, h, d], c, solid: true, cast: true, rg: 0.62, m: 0.05, ...o };
}

function cyl(
  x: number,
  y: number,
  z: number,
  r: number,
  h: number,
  c: string,
  o: Partial<Prop> = {},
): Prop {
  return { t: "cyl", p: [x, y, z], s: [r, h, 12], c, solid: true, cast: true, rg: 0.45, m: 0.2, ...o };
}

function sph(x: number, y: number, z: number, r: number, c: string, o: Partial<Prop> = {}): Prop {
  return { t: "sphere", p: [x, y, z], s: [r, r, r], c, solid: false, cast: true, rg: 0.4, m: 0.1, ...o };
}

function wallRing(minX: number, maxX: number, minZ: number, maxZ: number, h = 8): AABB[] {
  const t = 1.2;
  return [
    { minX: minX - t, maxX: minX, minY: 0, maxY: h, minZ, maxZ },
    { minX: maxX, maxX: maxX + t, minY: 0, maxY: h, minZ, maxZ },
    { minX, maxX, minY: 0, maxY: h, minZ: minZ - t, maxZ: minZ },
    { minX, maxX, minY: 0, maxY: h, minZ: maxZ, maxZ: maxZ + t },
  ];
}

function floorBox(minX: number, maxX: number, minZ: number, maxZ: number): AABB {
  return { minX, maxX, minY: -1.4, maxY: 0, minZ, maxZ };
}

function finish(partial: Omit<Level, "boxes">): Level {
  const boxes = [...partial.extras];
  for (const p of partial.props) {
    if (!p.solid) continue;
    if (p.r && (Math.abs(p.r[0]) > 0.01 || Math.abs(p.r[1]) > 0.01 || Math.abs(p.r[2]) > 0.01)) continue;
    const [x, y, z] = p.p;
    if (p.t === "box") {
      const [w, h, d] = p.s;
      boxes.push({
        minX: x - w / 2,
        maxX: x + w / 2,
        minY: y - h / 2,
        maxY: y + h / 2,
        minZ: z - d / 2,
        maxZ: z + d / 2,
      });
    } else if (p.t === "cyl") {
      const r = p.s[0];
      const h = p.s[1];
      boxes.push({
        minX: x - r,
        maxX: x + r,
        minY: y - h / 2,
        maxY: y + h / 2,
        minZ: z - r,
        maxZ: z + r,
      });
    } else if (p.t === "sphere") {
      const r = p.s[0];
      boxes.push({
        minX: x - r,
        maxX: x + r,
        minY: y - r,
        maxY: y + r,
        minZ: z - r,
        maxZ: z + r,
      });
    }
  }
  return { ...partial, boxes };
}

function buildPool(): Level {
  const wall = "#f3d5de";
  const trim = "#e7b3c2";
  const props: Prop[] = [
    box(0, 2.35, 11.25, 30.4, 4.7, 0.5, wall, { rg: 0.78 }),
    box(0, 2.35, -11.25, 30.4, 4.7, 0.5, wall, { rg: 0.78 }),
    box(15.25, 2.35, 0, 0.5, 4.7, 22, wall, { rg: 0.78 }),
    box(-15.25, 2.35, 0, 0.5, 4.7, 22, wall, { rg: 0.78 }),
    box(0, 4.8, 0, 30, 0.28, 22, "#f7e7ea", { rg: 0.9, cast: false }),
    box(0, 0.04, 0, 13.4, 0.06, 9.2, "#f7c6d6", {
      solid: false,
      cast: false,
      trans: 0.88,
      rg: 0.04,
      m: 0.02,
    }),
  ];
  for (const x of [-3.2, 3.2]) {
    props.push(
      cyl(x, 0.12, -4.2, 0.035, 8.4, "#f6ebe6", {
        solid: false,
        cast: false,
        r: [Math.PI / 2, 0, 0],
        m: 0.6,
        rg: 0.2,
      }),
    );
  }
  const chairZs = [-6.5, -3.2, -0.2, 2.8];
  for (const z of chairZs) {
    for (const side of [1, -1]) {
      const x = side * 11.4;
      props.push(
        box(x, 0.42, z, 0.7, 0.08, 0.7, "#f6ebe6", { rg: 0.55 }),
        box(x, 0.78, z + side * -0.0 + (side > 0 ? -0.28 : 0.28), 0.7, 0.55, 0.08, "#f6ebe6", {
          rg: 0.55,
          solid: false,
        }),
      );
    }
  }
  props.push(
    box(-11.2, 0.55, -6.4, 0.9, 1.1, 0.9, trim, { rg: 0.5 }),
    box(-9.3, 1.12, -6.4, 3.2, 0.08, 0.7, "#f4f7fb", { m: 0.85, rg: 0.12, solid: false }),
    cyl(-8.2, 1.0, -2.4, 0.045, 2, "#e7eef5", { m: 1, rg: 0.08 }),
    cyl(-7.5, 1.0, -2.4, 0.045, 2, "#e7eef5", { m: 1, rg: 0.08 }),
    box(-7.85, 0.45, -2.4, 0.7, 0.05, 0.12, "#e7eef5", { m: 1, rg: 0.08, solid: false }),
    box(-7.85, 0.9, -2.4, 0.7, 0.05, 0.12, "#e7eef5", { m: 1, rg: 0.08, solid: false }),
    box(-7.85, 1.35, -2.4, 0.7, 0.05, 0.12, "#e7eef5", { m: 1, rg: 0.08, solid: false }),
    sph(4.2, 0.28, -1.6, 0.28, "#e24b4b", { m: 0.15, rg: 0.35 }),
    {
      t: "torus",
      p: [6.4, 0.45, 3.4],
      s: [0.42, 0.09, 0],
      r: [Math.PI / 2.4, 0.2, 0.4],
      c: "#f6ebe6",
      solid: false,
      cast: true,
      m: 0.2,
      rg: 0.45,
    },
    box(0, 4.55, 0, 2.4, 0.08, 0.35, "#fff4e4", { e: "#fff1d2", ei: 1.4, solid: false, cast: false }),
    box(-7, 4.55, -4, 1.8, 0.08, 0.28, "#fff4e4", { e: "#fff1d2", ei: 1.1, solid: false, cast: false }),
    box(7, 4.55, -4, 1.8, 0.08, 0.28, "#fff4e4", { e: "#fff1d2", ei: 1.1, solid: false, cast: false }),
    {
      t: "plane",
      p: [0, 2.55, 10.96],
      s: [1.5, 1.5, 0],
      r: [0, Math.PI, 0],
      c: "#f6ebe6",
      sign: "3:17",
      solid: false,
      cast: false,
    },
    {
      t: "plane",
      p: [0, 2.35, -10.95],
      s: [2.2, 0.48, 0],
      c: "#ff7aa2",
      sign: "TOVÁBB",
      solid: false,
      cast: false,
    },
    box(12.6, 1.5, 8.2, 0.08, 0.9, 1.4, "#d7e7f2", {
      e: "#ffe7c2",
      ei: 0.35,
      solid: false,
      cast: false,
      m: 0.1,
      rg: 0.15,
    }),
    box(-12.6, 1.5, 8.2, 0.08, 0.9, 1.4, "#d7e7f2", {
      e: "#ffe7c2",
      ei: 0.35,
      solid: false,
      cast: false,
    }),
  );
  return finish({
    id: "medence",
    name: "Medence, 3:17",
    index: "01",
    blurb: "A víz meleg, pedig senki nem fűt.",
    spawn: { x: 0, y: 0.05, z: 7.2, yaw: 0 },
    sky: { zenith: "#f3b7c8", horizon: "#ffe4d4", ground: "#c98b9c" },
    fog: { color: "#f0d5dc", near: 14, far: 36 },
    sun: { position: [6, 12, 4], intensity: 0.55, color: "#ffe0ea" },
    ambient: 0.62,
    hemi: ["#ffe4ea", "#e7b8c4", 0.45],
    exposure: 1.06,
    floor: {
      w: 30,
      d: 22,
      cx: 0,
      cz: 0,
      y: 0.012,
      color: "#f0c3d0",
      roughness: 0.18,
      metalness: 0.55,
      mirror: 0.82,
      distortion: 0.22,
      strength: 1.15,
    },
    orbit: [0, 0.5],
    orbitR: 5.2,
    orbitY: 1.85,
    lights: [
      { p: [0, 4.2, 0], color: "#fff1dc", intensity: 8, dist: 16 },
      { p: [-7, 4.1, -4], color: "#ffe4ea", intensity: 4, dist: 12 },
      { p: [7, 4.1, -4], color: "#ffe4ea", intensity: 4, dist: 12 },
    ],
    props,
    extras: [floorBox(-15, 15, -11, 11)],
    memories: [
      {
        id: "medence-1",
        title: "Csempe",
        body: "A csempe meleg. A szűrő nem megy, mégis tiszta a víz.",
        p: [4.6, 1.25, 2.2],
      },
      {
        id: "medence-2",
        title: "Törölköző",
        body: "Valaki hagyott egy törölközőt. Száraz, és mégis nedves a padló körülötte.",
        p: [-5.2, 1.2, -1.4],
      },
      {
        id: "medence-3",
        title: "3:17",
        body: "3:17. Mindig 3:17. A mutató mintha nem is üveg alatt lenne.",
        p: [1.4, 1.35, -6.4],
      },
    ],
    portal: { x: 0, z: -9.4, to: "poolrooms", label: "A medencék" },
  });
}

function buildStreet(): Level {
  const wall = "#f0d2c2";
  const roof = "#c4787a";
  const props: Prop[] = [];
  const zs = [-24, -12, 0, 12, 24];
  for (const z of zs) {
    for (const side of [-1, 1] as const) {
      const x = side * 13.2;
      const face = side > 0 ? -1 : 1;
      props.push(
        box(x, 1.9, z, 7.4, 3.8, 8.2, wall, { rg: 0.84 }),
        box(x, 4.05, z, 8, 0.45, 8.8, roof, { solid: false, rg: 0.7 }),
        box(x + face * 3.78, 1.15, z + 2.1, 0.1, 1.7, 0.9, "#2a2328", { solid: false, cast: false }),
        box(x + face * 3.78, 2.35, z - 1.4, 0.1, 1.05, 1.35, "#ffe1b0", {
          solid: false,
          cast: false,
          e: "#ffe1b0",
          ei: 0.45,
        }),
        box(x + face * 3.78, 2.35, z + 2.3, 0.1, 1.05, 1.15, "#d5e6ef", {
          solid: false,
          cast: false,
          e: "#d5eaf5",
          ei: 0.28,
        }),
      );
    }
  }
  for (const z of [-16, 4, 18]) {
    for (const x of [-7.2, 7.2]) {
      props.push(
        cyl(x, 1.7, z, 0.07, 3.4, "#3a3336", { m: 0.4, rg: 0.4 }),
        sph(x, 3.45, z, 0.22, "#fff1d2", { e: "#ffe7b8", ei: 1.3, cast: false }),
      );
    }
  }
  props.push(
    box(4.6, 0.7, 14.5, 1.8, 1.2, 4.2, "#e7b7c4", { m: 0.45, rg: 0.35 }),
    box(4.6, 1.15, 14.5, 1.7, 0.45, 2.2, "#f6ebe6", { solid: false, m: 0.1, rg: 0.2, trans: 0.35 }),
    cyl(-5.5, 0.9, -6, 0.08, 1.8, "#3a3336"),
    cyl(5.5, 0.9, -6, 0.08, 1.8, "#3a3336"),
    box(0, 2.55, -6, 11.2, 0.08, 0.08, "#3a3336", { solid: false }),
    box(0, 0.04, 2, 1.1, 0.02, 7, "#f6ebe6", { solid: false, cast: false }),
    box(0, 0.04, -10, 1.1, 0.02, 7, "#f6ebe6", { solid: false, cast: false }),
    box(0, 0.04, -22, 1.1, 0.02, 7, "#f6ebe6", { solid: false, cast: false }),
  );
  for (const z of [-28, -8, 8, 28]) {
    for (const x of [-20, 20]) {
      props.push(
        cyl(x, 1.3, z, 0.18, 2.6, "#6d5a52", { rg: 0.9 }),
        sph(x, 3.1, z, 1.35, "#9a6d74", { solid: false, rg: 0.85, cast: true }),
      );
    }
  }
  props.push({
    t: "plane",
    p: [0, 2.2, -30.4],
    s: [2.4, 0.5, 0],
    c: "#ff7aa2",
    sign: "A FOLYOSÓ",
    solid: false,
    cast: false,
  });
  return finish({
    id: "utca",
    name: "Ugyanaz az utca",
    index: "03",
    blurb: "Minden ház ugyanazt az ablakot nézi.",
    spawn: { x: 0, y: 0.05, z: 6, yaw: 0 },
    sky: { zenith: "#f0a0b0", horizon: "#ffd0a4", ground: "#c47d88" },
    fog: { color: "#e7c2b4", near: 10, far: 48 },
    sun: { position: [-18, 14, 10], intensity: 1.45, color: "#ffc8a4" },
    ambient: 0.42,
    hemi: ["#ffd0c0", "#8a6670", 0.38],
    exposure: 1.08,
    floor: {
      w: 54,
      d: 70,
      cx: 0,
      cz: -2,
      y: 0.012,
      color: "#3a3236",
      roughness: 0.28,
      metalness: 0.62,
      mirror: 0.72,
      distortion: 0.08,
      strength: 0.9,
    },
    orbit: [0, 2],
    orbitR: 5.2,
    orbitY: 2.5,
    lights: [
      { p: [-7.2, 3.3, -16], color: "#ffe1a8", intensity: 6, dist: 14 },
      { p: [7.2, 3.3, 4], color: "#ffe1a8", intensity: 6, dist: 14 },
      { p: [-7.2, 3.3, 18], color: "#ffe1a8", intensity: 5, dist: 12 },
    ],
    props,
    extras: [...wallRing(-26, 26, -34, 34, 6), floorBox(-26, 26, -34, 34)],
    memories: [
      {
        id: "utca-1",
        title: "Név",
        body: "Minden postaládán ugyanaz a név, csak a házszám más.",
        p: [-2.2, 1.2, 2],
      },
      {
        id: "utca-2",
        title: "Hinta",
        body: "A hinta magától áll meg, amikor közelebb lépsz.",
        p: [0.4, 1.15, -6],
      },
      {
        id: "utca-3",
        title: "Tévé",
        body: "Az ablakokban tévé szól, pedig egyik házban sincs konnektor.",
        p: [2.2, 1.2, -18],
      },
    ],
    portal: { x: 0, z: -31.2, to: "folyoso", label: "A folyosó" },
  });
}

function buildHall(): Level {
  const wall = "#efe6dc";
  const locker = "#6e8c7e";
  const props: Prop[] = [
    box(0, 1.6, -0.25, 7.2, 3.2, 0.4, wall),
    box(0, 1.6, 49.7, 7.2, 3.2, 0.4, wall),
    box(-3.55, 1.6, 25, 0.4, 3.2, 50, wall),
    box(3.55, 1.6, 8, 0.4, 3.2, 16, wall),
    box(3.55, 1.6, 38, 0.4, 3.2, 24, wall),
    box(6.4, 1.6, 15.1, 6.2, 3.2, 0.35, wall),
    box(6.4, 1.6, 26.9, 6.2, 3.2, 0.35, wall),
    box(9.35, 1.6, 21, 0.4, 3.2, 12, wall),
    box(0, 3.28, 25, 6.6, 0.22, 50, "#f7f1ea", { cast: false, rg: 0.9 }),
    box(6.4, 3.28, 21, 5.6, 0.22, 11.4, "#f7f1ea", { cast: false, rg: 0.9 }),
    box(6.5, 0.78, 20.2, 1.4, 0.12, 0.7, "#c9b39a", { rg: 0.6 }),
    box(6.5, 1.15, 19.85, 1.4, 0.6, 0.08, "#c9b39a", { solid: false }),
    box(7.6, 1.35, 23.4, 0.7, 0.9, 1.3, "#d7c4ae", { rg: 0.7 }),
  ];
  const lockerZ: number[] = [];
  for (let z = 2.2; z < 46; z += 2.25) lockerZ.push(z);
  for (const z of lockerZ) {
    props.push(box(-2.85, 1.05, z, 0.55, 2.05, 0.78, locker, { m: 0.45, rg: 0.38 }));
    if (z < 13.5 || z > 28.5) {
      props.push(box(2.85, 1.05, z, 0.55, 2.05, 0.78, locker, { m: 0.45, rg: 0.38 }));
    }
  }
  for (const z of [6, 18, 30, 42]) {
    props.push(
      box(0, 3.12, z, 1.6, 0.06, 0.28, "#fff6e6", { e: "#fff3d6", ei: 1.5, solid: false, cast: false }),
    );
  }
  props.push(
    {
      t: "plane",
      p: [-3.3, 1.7, 11],
      s: [0.9, 1.15, 0],
      r: [0, Math.PI / 2, 0],
      c: "#f6ebe6",
      sign: "CSENGETÉS ELMARAD",
      solid: false,
      cast: false,
    },
    {
      t: "plane",
      p: [3.3, 1.7, 34],
      s: [0.9, 1.15, 0],
      r: [0, -Math.PI / 2, 0],
      c: "#f6ebe6",
      sign: "NE FUTSJ",
      solid: false,
      cast: false,
    },
    {
      t: "plane",
      p: [0, 2.35, 49.42],
      s: [2.3, 0.46, 0],
      c: "#ff7aa2",
      sign: "KIJÁRAT",
      solid: false,
      cast: false,
    },
    box(8.2, 1.6, 24.6, 0.08, 1.1, 1.6, "#d5e6ef", {
      e: "#ffe7c4",
      ei: 0.4,
      solid: false,
      cast: false,
    }),
  );
  return finish({
    id: "folyoso",
    name: "A folyosó vége",
    index: "04",
    blurb: "A menza illata van, pedig ez csak egy folyosó.",
    spawn: { x: 0, y: 0.05, z: 3.2, yaw: Math.PI },
    sky: { zenith: "#f0e4da", horizon: "#f7efe6", ground: "#d9cfc4" },
    fog: { color: "#e7ddd2", near: 6, far: 24 },
    sun: { position: [2, 8, 10], intensity: 0.22, color: "#fff0e4" },
    ambient: 0.58,
    hemi: ["#fff4ea", "#cbb8aa", 0.35],
    exposure: 1.02,
    floor: {
      w: 14,
      d: 54,
      cx: 2.2,
      cz: 24.5,
      y: 0.012,
      color: "#d9cbb8",
      roughness: 0.32,
      metalness: 0.35,
      mirror: 0.55,
      distortion: 0.04,
      strength: 0.65,
    },
    orbit: [0, 12],
    orbitR: 1.15,
    orbitY: 1.55,
    lights: [
      { p: [0, 2.9, 6], color: "#fff6e8", intensity: 6, dist: 12 },
      { p: [0, 2.9, 18], color: "#fff6e8", intensity: 6, dist: 12 },
      { p: [0, 2.9, 32], color: "#fff6e8", intensity: 6, dist: 12 },
      { p: [0, 2.9, 44], color: "#fff4e4", intensity: 5, dist: 11 },
    ],
    props,
    extras: [floorBox(-3.3, 9.2, 0, 49.4)],
    memories: [
      {
        id: "folyoso-1",
        title: "Szekrény",
        body: "A szekrények zárva. Belül mégis ruha susog.",
        p: [0.2, 1.25, 9],
      },
      {
        id: "folyoso-2",
        title: "Menza",
        body: "A menza illata van, pedig ez csak egy folyosó.",
        p: [6.4, 1.3, 21],
      },
      {
        id: "folyoso-3",
        title: "Tábla",
        body: "A kijárat táblája zöld volt. Most a rózsaszín a szabály.",
        p: [0.3, 1.25, 40],
      },
    ],
    portal: { x: 0, z: 46.6, to: "jatszo", label: "A játszótér" },
  });
}

function buildPlay(): Level {
  const props: Prop[] = [
    box(-4.2, 0.18, 1.4, 1.3, 0.36, 0.9, "#e24b4b", { rg: 0.55 }),
    box(-4.2, 0.42, 0.45, 1.3, 0.42, 0.9, "#e24b4b", { rg: 0.55 }),
    box(-4.2, 0.68, -0.45, 1.3, 0.46, 0.9, "#e24b4b", { rg: 0.55 }),
    box(-4.2, 0.62, -1.9, 1.15, 0.08, 2.3, "#f0c36a", {
      solid: false,
      r: [0.42, 0, 0],
      rg: 0.4,
    }),
    cyl(3.15, 1.35, 1.6, 0.07, 2.7, "#3a3336"),
    cyl(4.85, 1.35, 1.6, 0.07, 2.7, "#3a3336"),
    box(4, 2.65, 1.6, 1.9, 0.08, 0.08, "#3a3336", { solid: false }),
    cyl(0, 0.45, -6.2, 0.16, 0.9, "#f0c36a", { m: 0.4, rg: 0.35 }),
    box(7.2, 0.22, -4, 0.9, 0.44, 0.9, "#f6ebe6"),
    box(7.2, 0.48, -4.85, 0.9, 0.48, 0.9, "#f6ebe6"),
    box(7.2, 0.74, -5.7, 0.9, 0.5, 0.9, "#e7e2dc"),
    box(-8, 0.32, 4.5, 1.6, 0.42, 0.55, "#c98488", { rg: 0.6 }),
  ];
  for (const [x, z] of [
    [-14, -12],
    [14, -10],
    [-15, 10],
    [13, 12],
    [-6, -14],
    [10, -14],
  ] as const) {
    props.push(
      cyl(x, 1.15, z, 0.16, 2.3, "#6d5a52", { rg: 0.9 }),
      sph(x, 2.7, z, 1.15, "#b7c4b4", { solid: false, rg: 0.9 }),
    );
  }
  props.push({
    t: "plane",
    p: [0, 2.3, -16.3],
    s: [2.4, 0.48, 0],
    c: "#ff7aa2",
    sign: "MOTEL",
    solid: false,
    cast: false,
  });
  return finish({
    id: "jatszo",
    name: "Ködös játszótér",
    index: "05",
    blurb: "A körhinta le van maradva a saját zenéjétől.",
    spawn: { x: 0, y: 0.05, z: 10.5, yaw: 0 },
    sky: { zenith: "#d7c6e0", horizon: "#f3d5dc", ground: "#b7a8b0" },
    fog: { color: "#e4d5dc", near: 4, far: 26 },
    sun: { position: [8, 16, 6], intensity: 0.85, color: "#ffd5e4" },
    ambient: 0.55,
    hemi: ["#f6e4ea", "#9a8c94", 0.4],
    exposure: 1.05,
    floor: {
      w: 42,
      d: 40,
      cx: 0,
      cz: -1,
      y: 0.012,
      color: "#8d9790",
      roughness: 0.42,
      metalness: 0.28,
      mirror: 0.42,
      distortion: 0.05,
      strength: 0.55,
    },
    orbit: [0, -1],
    orbitR: 7,
    orbitY: 2.3,
    lights: [
      { p: [0, 2.2, -15], color: "#ffb7cc", intensity: 5, dist: 12 },
      { p: [4, 2.4, 1.6], color: "#ffe1b0", intensity: 2.2, dist: 8 },
    ],
    props,
    extras: [...wallRing(-18, 18, -18, 16, 5), floorBox(-18, 18, -18, 16)],
    memories: [
      {
        id: "jatszo-1",
        title: "Körhinta",
        body: "A körhinta zenéje le van maradva a forgástól.",
        p: [1.6, 1.2, -6.2],
      },
      {
        id: "jatszo-2",
        title: "Homok",
        body: "A homokozóban nincs homok. Ujjlenyomat mégis van.",
        p: [-6.2, 1.15, 2.4],
      },
      {
        id: "jatszo-3",
        title: "Köd",
        body: "A köd a térdedig ér, és hidegebb, mint a levegő.",
        p: [3.4, 1.2, -10],
      },
    ],
    portal: { x: 0, z: -15.2, to: "motel", label: "A motel" },
  });
}

function buildMotel(): Level {
  const stucco = "#e7d5c6";
  const props: Prop[] = [
    box(-12.4, 3.3, 0, 10.6, 6.6, 22, stucco, { rg: 0.86 }),
    box(-12.4, 6.75, 0, 11.2, 0.4, 22.6, "#c9a898", { solid: false, rg: 0.7 }),
  ];
  for (const z of [-8, -4, 0, 4, 8]) {
    props.push(
      box(-7.02, 1.7, z, 0.08, 1.15, 1.35, "#2a2328", { solid: false, cast: false }),
      box(-7.02, 4.5, z, 0.08, 1.05, 1.25, "#ffd7b0", {
        solid: false,
        cast: false,
        e: z === 0 ? "#ffd7b0" : "#c9d7e4",
        ei: z === 0 ? 0.7 : 0.18,
      }),
    );
  }
  props.push(
    box(-6.95, 1.15, 3.2, 0.12, 2.1, 1.05, "#f6ebe6", {
      e: "#fff1dc",
      ei: 0.55,
      solid: false,
      cast: false,
    }),
    {
      t: "plane",
      p: [-6.7, 5.7, 0],
      s: [6.2, 1.15, 0],
      r: [0, Math.PI / 2, 0],
      c: "#ff7aa2",
      sign: "VAN HELY",
      solid: false,
      cast: false,
    },
    box(-4.2, 1.15, -7.4, 0.8, 2.1, 0.7, "#8c4558", { m: 0.25, rg: 0.4 }),
    box(-3.95, 1.05, -7.4, 0.08, 1.2, 0.45, "#1a1214", {
      solid: false,
      e: "#9ad7ff",
      ei: 0.35,
    }),
    box(3.2, 0.55, -6.5, 1.9, 1.05, 4.1, "#d7b7c0", { m: 0.5, rg: 0.32 }),
    box(3.2, 0.95, -5.2, 1.5, 0.4, 1.6, "#2a2428", { solid: false, m: 0.2, rg: 0.15 }),
    cyl(6.5, 0.35, 5.5, 0.55, 0.5, "#c98488", { m: 0.3, rg: 0.45 }),
    box(8.4, 0.28, 2.2, 0.7, 0.4, 0.45, "#f0c36a", { rg: 0.6 }),
    {
      t: "plane",
      p: [-6.85, 2.55, 3.2],
      s: [0.7, 0.32, 0],
      r: [0, Math.PI / 2, 0],
      c: "#f0c36a",
      sign: "12",
      solid: false,
      cast: false,
    },
  );
  return finish({
    id: "motel",
    name: "Motel, 1998",
    index: "06",
    blurb: "A neonból hiányzik egy betű. Mégis kiolvasod.",
    spawn: { x: 8.5, y: 0.05, z: 3.5, yaw: Math.PI / 2 },
    sky: { zenith: "#24182c", horizon: "#5c3a48", ground: "#140e12" },
    fog: { color: "#1c1418", near: 8, far: 40 },
    sun: { position: [-6, 14, 8], intensity: 0.18, color: "#b9c4e8" },
    ambient: 0.3,
    hemi: ["#3a2a38", "#140e12", 0.28],
    exposure: 1.02,
    floor: {
      w: 46,
      d: 36,
      cx: 0,
      cz: 0,
      y: 0.012,
      color: "#2a2328",
      roughness: 0.22,
      metalness: 0.7,
      mirror: 0.88,
      distortion: 0.12,
      strength: 1.25,
    },
    orbit: [1.5, 1],
    orbitR: 6,
    orbitY: 2.4,
    lights: [
      { p: [-5.2, 5.4, 0], color: "#ff7aa2", intensity: 14, dist: 18 },
      { p: [-4, 2.2, 3.2], color: "#fff1dc", intensity: 6, dist: 9 },
      { p: [-4.2, 2.2, -7.4], color: "#9ad7ff", intensity: 3.5, dist: 8 },
    ],
    props,
    extras: [...wallRing(-22, 20, -16, 16, 8), floorBox(-22, 20, -16, 16)],
    memories: [
      {
        id: "motel-1",
        title: "Neon",
        body: "A neonból hiányzik egy betű. Mégis ki tudod olvasni: van hely.",
        p: [-2.2, 1.3, 0.4],
      },
      {
        id: "motel-2",
        title: "12-es",
        body: "A 12-es szoba kulcsa a pulton van. A szoba nem szerepel a térképen.",
        p: [-3.2, 1.25, 3.4],
      },
      {
        id: "motel-3",
        title: "Tócsa",
        body: "A parkoló tócsájában hold látszik. Ma nincs hold.",
        p: [4.5, 1.2, 6.2],
      },
    ],
    portal: { x: -4.6, z: 3.2, to: "szoba", label: "12-es szoba" },
  });
}

function buildRoom(): Level {
  const plaster = "#efe2d8";
  const wood = "#6a4038";
  const props: Prop[] = [
    box(0, 1.55, 5.55, 8.6, 3.1, 0.3, plaster, { rg: 0.86 }),
    box(0, 1.55, -5.15, 8.6, 3.1, 0.3, plaster, { rg: 0.86 }),
    box(-4.15, 1.55, 0.2, 0.3, 3.1, 10.7, plaster, { rg: 0.86 }),
    box(4.15, 1.55, 0.2, 0.3, 3.1, 10.7, plaster, { rg: 0.86 }),
    box(0, 3.12, 0.2, 8, 0.16, 10.4, "#f3e6dc", { cast: false, rg: 0.92 }),
    box(2.35, 1.55, -3.35, 0.12, 3.1, 3.3, plaster, { rg: 0.84 }),
    box(-2.15, 0.28, -0.35, 1.9, 0.42, 3.3, wood, { rg: 0.55 }),
    box(-2.15, 0.58, -0.35, 1.95, 0.22, 3.35, "#c45b78", { solid: false, rg: 0.7 }),
    box(-2.15, 0.74, -1.7, 1.35, 0.16, 0.48, "#f6ebe6", { solid: false, rg: 0.8 }),
    box(-2.15, 0.85, -1.95, 1.9, 0.7, 0.1, wood, { solid: false, rg: 0.5 }),
    box(-0.85, 0.3, -1.75, 0.48, 0.55, 0.42, wood, { rg: 0.48 }),
    cyl(-0.85, 0.72, -1.75, 0.08, 0.22, "#f0c36a", { e: "#ffd2a8", ei: 0.9, solid: false, m: 0.3 }),
    box(2.55, 0.36, 2.55, 1.55, 0.68, 0.48, "#3a2c30", { rg: 0.45, m: 0.2 }),
    box(2.55, 1.05, 2.42, 1.2, 0.72, 0.1, "#1a1214", { solid: false, m: 0.4, rg: 0.3 }),
    box(3.15, 0.28, -3.55, 1.35, 0.5, 2.05, "#efe6dc", { rg: 0.4, m: 0.15 }),
    box(3.15, 0.5, -3.55, 1.05, 0.08, 1.55, "#c9a0b0", {
      solid: false,
      cast: false,
      trans: 0.72,
      rg: 0.05,
      m: 0.08,
    }),
    box(3.9, 1.45, -3.5, 0.05, 0.85, 0.55, "#d5e6ef", { solid: false, cast: false, m: 0.92, rg: 0.06 }),
    box(0, 1.55, -4.98, 2.2, 1.35, 0.06, "#ffb7cc", {
      solid: false,
      cast: false,
      e: "#ff7aa2",
      ei: 0.85,
      trans: 0.4,
      rg: 0.04,
    }),
    box(-1.4, 1.55, -4.82, 0.28, 2.15, 0.08, "#c98488", { solid: false, rg: 0.7 }),
    box(1.4, 1.55, -4.82, 0.28, 2.15, 0.08, "#c98488", { solid: false, rg: 0.7 }),
    box(0, 2.95, 1.2, 1.8, 0.05, 0.28, "#fff6e6", { e: "#fff1d4", ei: 0.7, solid: false, cast: false }),
    cyl(3.35, 1.05, 4.35, 0.035, 2.1, "#3a3336", { m: 0.5, rg: 0.4 }),
    box(3.35, 0.85, 4.1, 0.42, 1.15, 0.1, "#2a2328", { solid: false, rg: 0.8 }),
    box(1.15, 0.16, 3.35, 0.62, 0.28, 0.4, "#5c3038", { rg: 0.6 }),
    box(0.2, 0.04, 0.4, 1.6, 0.02, 2.4, "#8a4558", { solid: false, cast: false, rg: 0.85 }),
    {
      t: "plane",
      p: [-1.5, 2.25, 5.36],
      s: [0.62, 0.34, 0],
      r: [0, Math.PI, 0],
      c: "#f0c36a",
      sign: "12",
      solid: false,
      cast: false,
    },
    {
      t: "plane",
      p: [0.85, 2.35, -4.95],
      s: [1.05, 0.4, 0],
      c: "#ff7aa2",
      sign: "3:17",
      solid: false,
      cast: false,
    },
  ];
  return finish({
    id: "szoba",
    name: "12-es szoba",
    index: "07",
    blurb: "A kulcs benne van a zárban. A zár nincs bezárva.",
    spawn: { x: 0, y: 0.05, z: 4.05, yaw: 0 },
    sky: { zenith: "#1a1218", horizon: "#3a2430", ground: "#120c10" },
    fog: { color: "#1c1418", near: 7, far: 16 },
    sun: { position: [2, 6, -4], intensity: 0.08, color: "#ffb7cc" },
    ambient: 0.28,
    hemi: ["#3a2a32", "#140e12", 0.22],
    exposure: 1.04,
    floor: {
      w: 8.2,
      d: 10.6,
      cx: 0,
      cz: 0.2,
      y: 0.012,
      color: "#6a3844",
      roughness: 0.46,
      metalness: 0.22,
      mirror: 0.42,
      distortion: 0.03,
      strength: 0.48,
    },
    orbit: [0, 0.4],
    orbitR: 1.4,
    orbitY: 1.55,
    lights: [
      { p: [0, 2.7, 1.2], color: "#fff1dc", intensity: 7, dist: 11 },
      { p: [-0.85, 1.35, -1.6], color: "#ffd2a8", intensity: 3.2, dist: 5 },
      { p: [2.55, 1.25, 2.05], color: "#9ad7ff", intensity: 7, dist: 7 },
      { p: [0, 1.6, -4.4], color: "#ff7aa2", intensity: 4, dist: 6 },
      { p: [3.2, 2.3, -3.5], color: "#e7d2c0", intensity: 2.4, dist: 4.5 },
    ],
    props,
    extras: [floorBox(-3.95, 3.95, -4.95, 5.35)],
    memories: [
      {
        id: "szoba-1",
        title: "Kulcs",
        body: "A kulcs benne van a zárban. Senki nem fordította el.",
        p: [-0.55, 1.15, -1.15],
      },
      {
        id: "szoba-2",
        title: "Kép",
        body: "A tévé a medencét mutatja felülről. A vízben te állsz, pedig itt vagy.",
        p: [1.35, 1.2, 1.15],
      },
      {
        id: "szoba-3",
        title: "Másodperc",
        body: "A másodpercmutató megindul, aztán meggondolja magát. 3:17 marad.",
        p: [-1.55, 1.3, -3.55],
      },
    ],
    portal: { x: 0, z: -4.15, to: "medence", label: "A víz" },
  });
}

function buildPools(): Level {
  const tile = "#efe3b4";
  const trim = "#d7c98a";
  const props: Prop[] = [
    box(0, 1.7, 16.15, 28.4, 3.4, 0.32, tile, { rg: 0.18, m: 0.12 }),
    box(0, 1.7, -16.15, 28.4, 3.4, 0.32, tile, { rg: 0.18, m: 0.12 }),
    box(-14.15, 1.7, 0, 0.32, 3.4, 32.2, tile, { rg: 0.18, m: 0.12 }),
    box(14.15, 1.7, 0, 0.32, 3.4, 32.2, tile, { rg: 0.18, m: 0.12 }),
    box(0, 3.42, 0, 28, 0.14, 32, "#f6f0d4", { rg: 0.84, cast: false }),
    box(-8, 1.7, 6.1, 11.6, 3.4, 0.26, tile, { rg: 0.18, m: 0.1 }),
    box(8, 1.7, 6.1, 11.6, 3.4, 0.26, tile, { rg: 0.18, m: 0.1 }),
    box(-8, 1.7, -6.1, 11.6, 3.4, 0.26, tile, { rg: 0.18, m: 0.1 }),
    box(8, 1.7, -6.1, 11.6, 3.4, 0.26, tile, { rg: 0.18, m: 0.1 }),
    box(-6.15, 1.7, 11.2, 0.26, 3.4, 9.2, tile, { rg: 0.18, m: 0.1 }),
    box(6.15, 1.7, 11.2, 0.26, 3.4, 9.2, tile, { rg: 0.18, m: 0.1 }),
    box(-6.15, 1.7, -11.2, 0.26, 3.4, 9.2, tile, { rg: 0.18, m: 0.1 }),
    box(6.15, 1.7, -11.2, 0.26, 3.4, 9.2, tile, { rg: 0.18, m: 0.1 }),
  ];
  for (const [x, z] of [
    [-3.6, -1.6],
    [3.6, -1.6],
    [-3.6, 1.6],
    [3.6, 1.6],
  ] as const) {
    props.push(cyl(x, 1.65, z, 0.2, 3.3, tile, { rg: 0.16, m: 0.16 }));
  }
  for (const z of [12.4, 3.2, -2.4, -10.6]) {
    props.push(
      box(0, 3.22, z, 2.6, 0.05, 0.18, "#fff8dc", {
        e: "#fff3c4",
        ei: 1.55,
        solid: false,
        cast: false,
      }),
    );
  }
  props.push(
    box(-10.2, 3.22, 0.2, 0.18, 0.05, 2.4, "#f3fff8", {
      e: "#e9fff4",
      ei: 1.2,
      solid: false,
      cast: false,
    }),
    box(10.2, 3.22, 0.2, 0.18, 0.05, 2.4, "#f3fff8", {
      e: "#e9fff4",
      ei: 1.2,
      solid: false,
      cast: false,
    }),
    box(0, 3.2, -2.4, 1.15, 0.045, 0.14, "#ffd5e4", {
      e: "#ff7aa2",
      ei: 1.35,
      solid: false,
      cast: false,
    }),
    box(0, 0.045, 0, 7.2, 0.04, 7.2, "#7ebdb8", {
      solid: false,
      cast: false,
      trans: 0.45,
      rg: 0.04,
      m: 0.08,
    }),
    box(0, 0.045, 11.4, 4.2, 0.04, 5.4, "#8ec9c4", {
      solid: false,
      cast: false,
      trans: 0.4,
      rg: 0.04,
    }),
    box(-10.2, 0.045, 0, 4.4, 0.04, 6.2, "#8ec9c4", {
      solid: false,
      cast: false,
      trans: 0.4,
      rg: 0.04,
    }),
    box(10.2, 0.045, -2, 4.4, 0.04, 6.2, "#8ec9c4", {
      solid: false,
      cast: false,
      trans: 0.4,
      rg: 0.04,
    }),
    box(-11.2, 0.28, 9.2, 1.4, 0.38, 0.42, "#f4efe2", { rg: 0.45 }),
    box(11.1, 0.28, -9.4, 1.4, 0.38, 0.42, "#f4efe2", { rg: 0.45 }),
    cyl(-1.7, 0.85, -1.1, 0.035, 1.7, "#e7eef6", { m: 0.95, rg: 0.12 }),
    cyl(-1.15, 0.85, -1.1, 0.035, 1.7, "#e7eef6", { m: 0.95, rg: 0.12 }),
    box(-1.42, 0.2, -1.1, 0.7, 0.05, 0.08, "#e7eef6", { m: 0.9, rg: 0.12, solid: false }),
    box(-1.42, 0.7, -1.1, 0.7, 0.05, 0.08, "#e7eef6", { m: 0.9, rg: 0.12, solid: false }),
    box(-1.42, 1.2, -1.1, 0.7, 0.05, 0.08, "#e7eef6", { m: 0.9, rg: 0.12, solid: false }),
    {
      t: "torus",
      p: [2.4, 0.18, 2.2],
      s: [0.42, 0.07, 0],
      r: [Math.PI / 2.2, 0.2, 0.1],
      c: "#f6ebe6",
      solid: false,
      m: 0.15,
      rg: 0.4,
    },
    box(0, 1.15, 6.22, 1.7, 0.08, 0.08, trim, { solid: false, m: 0.3, rg: 0.4 }),
    box(0, 1.15, -6.22, 1.7, 0.08, 0.08, trim, { solid: false, m: 0.3, rg: 0.4 }),
    {
      t: "plane",
      p: [0, 2.15, 15.95],
      s: [1.6, 0.42, 0],
      r: [0, Math.PI, 0],
      c: "#f0c36a",
      sign: "1.6 m",
      solid: false,
      cast: false,
    },
    {
      t: "plane",
      p: [-13.95, 1.7, 2],
      s: [1.3, 0.4, 0],
      r: [0, Math.PI / 2, 0],
      c: "#efe3b4",
      sign: "CSEND",
      solid: false,
      cast: false,
    },
    {
      t: "plane",
      p: [0, 2.05, -15.95],
      s: [2.4, 0.46, 0],
      c: "#ff7aa2",
      sign: "AZ UTCA",
      solid: false,
      cast: false,
    },
  );
  return finish({
    id: "poolrooms",
    name: "Poolrooms",
    index: "02",
    blurb: "A víz áll. Mégis nyugodtabb, mint kellene.",
    spawn: { x: 0, y: 0.05, z: 12.2, yaw: 0 },
    sky: { zenith: "#d7e6c4", horizon: "#f4ecd4", ground: "#b7c8b0" },
    fog: { color: "#e4f0ea", near: 10, far: 34 },
    sun: { position: [4, 10, 6], intensity: 0.18, color: "#fff6d8" },
    ambient: 0.42,
    hemi: ["#f7f3df", "#8fb8b4", 0.34],
    exposure: 1.08,
    floor: {
      w: 28,
      d: 32,
      cx: 0,
      cz: 0,
      y: 0.012,
      color: "#8fd0cc",
      roughness: 0.08,
      metalness: 0.72,
      mirror: 0.94,
      distortion: 0.04,
      strength: 1.5,
    },
    orbit: [0, 2],
    orbitR: 4.2,
    orbitY: 1.45,
    lights: [
      { p: [0, 3.05, 12.4], color: "#fff6d0", intensity: 9, dist: 12 },
      { p: [0, 3.05, 3.2], color: "#fff6d0", intensity: 11, dist: 14 },
      { p: [0, 3.05, -2.4], color: "#ffe0ea", intensity: 4, dist: 8 },
      { p: [0, 3.05, -10.6], color: "#e9fff6", intensity: 9, dist: 12 },
      { p: [-10, 2.9, 0], color: "#fff8e4", intensity: 6, dist: 10 },
      { p: [10, 2.9, 0], color: "#fff8e4", intensity: 6, dist: 10 },
    ],
    props,
    extras: [floorBox(-13.9, 13.9, -15.9, 15.9)],
    memories: [
      {
        id: "poolrooms-1",
        title: "Klór",
        body: "Klórszag van, pedig ezt a medencét senki nem töltötte fel.",
        p: [0.4, 1.2, 8.6],
      },
      {
        id: "poolrooms-2",
        title: "Csempe",
        body: "Minden csempe ugyanaz. Még a hajszálrepedés is ugyanott van.",
        p: [-9.2, 1.2, 1.2],
      },
      {
        id: "poolrooms-3",
        title: "Nyugalom",
        body: "A víz nem mozdul. Mégis hallod, ahogy lélegzik.",
        p: [0.2, 1.2, -10.2],
      },
    ],
    portal: { x: 0, z: -14.6, to: "utca", label: "Az utca" },
  });
}

export const LEVEL_LIST: Level[] = [
  buildPool(),
  buildPools(),
  buildStreet(),
  buildHall(),
  buildPlay(),
  buildMotel(),
  buildRoom(),
];

const BY_ID = new Map(LEVEL_LIST.map((level) => [level.id, level]));

export function getLevel(id: string): Level {
  return BY_ID.get(id) ?? LEVEL_LIST[0];
}

export const LEVEL_IDS = LEVEL_LIST.map((level) => level.id);
