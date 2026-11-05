import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, i as Canvas, n as Environment, o as useFrame, r as MeshReflectorMaterial, s as useThree, t as Lightformer, u as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as Settings, c as Play, d as Map$1, f as FolderOpen, l as Menu, n as VolumeX, o as Save, r as Volume2, s as RotateCcw, t as X, u as Maximize } from "../_libs/lucide-react.mjs";
import { B as SRGBColorSpace, J as Vector2, c as BufferGeometry, f as Color, s as BufferAttribute, u as CanvasTexture, z as RepeatWrapping } from "../_libs/monogrid__gainmap-js+three.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as Vignette, i as Noise, n as ChromaticAberration, r as EffectComposer, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CusJ-QIx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useGame = create((set) => ({
	mode: "title",
	levelId: "medence",
	quality: "max",
	sensitivity: 1,
	volume: .65,
	invertY: false,
	invertX: false,
	collected: [],
	visited: ["medence"],
	note: null,
	toast: "",
	prompt: "",
	fading: false,
	banner: "",
	playSeconds: 0,
	patch: (partial) => set(partial)
}));
var ctx = null;
var master = null;
var filter = null;
var oscA = null;
var oscB = null;
var noise = null;
var MOOD = {
	medence: [
		98,
		146.8,
		520
	],
	poolrooms: [
		92.5,
		138.6,
		440
	],
	utca: [
		82.4,
		123.5,
		640
	],
	folyoso: [
		130.8,
		196,
		900
	],
	jatszo: [
		73.4,
		110,
		480
	],
	motel: [
		87.3,
		130.8,
		380
	],
	szoba: [
		65.4,
		98,
		260
	]
};
function noiseBuffer(ac) {
	if (noise) return noise;
	const buffer = ac.createBuffer(1, ac.sampleRate * .12, ac.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	noise = buffer;
	return buffer;
}
var audio = {
	ensure() {
		if (typeof window === "undefined") return;
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return;
		if (!ctx) {
			ctx = new AC();
			master = ctx.createGain();
			master.gain.value = useGame.getState().volume * .4;
			master.connect(ctx.destination);
			filter = ctx.createBiquadFilter();
			filter.type = "lowpass";
			filter.frequency.value = 520;
			const g = ctx.createGain();
			g.gain.value = .07;
			oscA = ctx.createOscillator();
			oscB = ctx.createOscillator();
			oscA.type = "sine";
			oscB.type = "triangle";
			oscA.frequency.value = 98;
			oscB.frequency.value = 146.8;
			oscA.connect(filter);
			oscB.connect(filter);
			filter.connect(g);
			g.connect(master);
			oscA.start();
			oscB.start();
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState === "visible") ctx?.resume();
			});
		}
		if (ctx.state === "suspended") ctx.resume();
		this.setVolume(useGame.getState().volume);
	},
	setVolume(v) {
		if (!master || !ctx) return;
		master.gain.setTargetAtTime(Math.max(0, v) * .4, ctx.currentTime, .05);
	},
	setMood(id) {
		if (!ctx || !oscA || !oscB || !filter) return;
		const mood = MOOD[id] ?? MOOD.medence;
		const t = ctx.currentTime;
		oscA.frequency.setTargetAtTime(mood[0], t, .4);
		oscB.frequency.setTargetAtTime(mood[1], t, .4);
		filter.frequency.setTargetAtTime(mood[2], t, .5);
	},
	chime() {
		if (!ctx || !master) return;
		const t = ctx.currentTime;
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = "sine";
		o.frequency.setValueAtTime(523.25, t);
		o.frequency.exponentialRampToValueAtTime(784, t + .18);
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(.12, t + .02);
		g.gain.exponentialRampToValueAtTime(1e-4, t + .45);
		o.connect(g);
		g.connect(master);
		o.start(t);
		o.stop(t + .5);
	},
	step() {
		if (!ctx || !master || useGame.getState().volume <= .01) return;
		const src = ctx.createBufferSource();
		src.buffer = noiseBuffer(ctx);
		const band = ctx.createBiquadFilter();
		band.type = "bandpass";
		band.frequency.value = 180 + Math.random() * 80;
		band.Q.value = .7;
		const g = ctx.createGain();
		const t = ctx.currentTime;
		g.gain.setValueAtTime(.05, t);
		g.gain.exponentialRampToValueAtTime(1e-4, t + .09);
		src.connect(band);
		band.connect(g);
		g.connect(master);
		src.start(t);
		src.stop(t + .1);
	}
};
function box(x, y, z, w, h, d, c, o = {}) {
	return {
		t: "box",
		p: [
			x,
			y,
			z
		],
		s: [
			w,
			h,
			d
		],
		c,
		solid: true,
		cast: true,
		rg: .62,
		m: .05,
		...o
	};
}
function cyl(x, y, z, r, h, c, o = {}) {
	return {
		t: "cyl",
		p: [
			x,
			y,
			z
		],
		s: [
			r,
			h,
			12
		],
		c,
		solid: true,
		cast: true,
		rg: .45,
		m: .2,
		...o
	};
}
function sph(x, y, z, r, c, o = {}) {
	return {
		t: "sphere",
		p: [
			x,
			y,
			z
		],
		s: [
			r,
			r,
			r
		],
		c,
		solid: false,
		cast: true,
		rg: .4,
		m: .1,
		...o
	};
}
function wallRing(minX, maxX, minZ, maxZ, h = 8) {
	const t = 1.2;
	return [
		{
			minX: minX - t,
			maxX: minX,
			minY: 0,
			maxY: h,
			minZ,
			maxZ
		},
		{
			minX: maxX,
			maxX: maxX + t,
			minY: 0,
			maxY: h,
			minZ,
			maxZ
		},
		{
			minX,
			maxX,
			minY: 0,
			maxY: h,
			minZ: minZ - t,
			maxZ: minZ
		},
		{
			minX,
			maxX,
			minY: 0,
			maxY: h,
			minZ: maxZ,
			maxZ: maxZ + t
		}
	];
}
function floorBox(minX, maxX, minZ, maxZ) {
	return {
		minX,
		maxX,
		minY: -1.4,
		maxY: 0,
		minZ,
		maxZ
	};
}
function finish(partial) {
	const boxes = [...partial.extras];
	for (const p of partial.props) {
		if (!p.solid) continue;
		if (p.r && (Math.abs(p.r[0]) > .01 || Math.abs(p.r[1]) > .01 || Math.abs(p.r[2]) > .01)) continue;
		const [x, y, z] = p.p;
		if (p.t === "box") {
			const [w, h, d] = p.s;
			boxes.push({
				minX: x - w / 2,
				maxX: x + w / 2,
				minY: y - h / 2,
				maxY: y + h / 2,
				minZ: z - d / 2,
				maxZ: z + d / 2
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
				maxZ: z + r
			});
		} else if (p.t === "sphere") {
			const r = p.s[0];
			boxes.push({
				minX: x - r,
				maxX: x + r,
				minY: y - r,
				maxY: y + r,
				minZ: z - r,
				maxZ: z + r
			});
		}
	}
	return {
		...partial,
		boxes
	};
}
function buildPool() {
	const wall = "#f3d5de";
	const trim = "#e7b3c2";
	const props = [
		box(0, 2.35, 11.25, 30.4, 4.7, .5, wall, { rg: .78 }),
		box(0, 2.35, -11.25, 30.4, 4.7, .5, wall, { rg: .78 }),
		box(15.25, 2.35, 0, .5, 4.7, 22, wall, { rg: .78 }),
		box(-15.25, 2.35, 0, .5, 4.7, 22, wall, { rg: .78 }),
		box(0, 4.8, 0, 30, .28, 22, "#f7e7ea", {
			rg: .9,
			cast: false
		}),
		box(0, .04, 0, 13.4, .06, 9.2, "#f7c6d6", {
			solid: false,
			cast: false,
			trans: .88,
			rg: .04,
			m: .02
		})
	];
	for (const x of [-3.2, 3.2]) props.push(cyl(x, .12, -4.2, .035, 8.4, "#f6ebe6", {
		solid: false,
		cast: false,
		r: [
			Math.PI / 2,
			0,
			0
		],
		m: .6,
		rg: .2
	}));
	for (const z of [
		-6.5,
		-3.2,
		-.2,
		2.8
	]) for (const side of [1, -1]) {
		const x = side * 11.4;
		props.push(box(x, .42, z, .7, .08, .7, "#f6ebe6", { rg: .55 }), box(x, .78, z + side * -0 + (side > 0 ? -.28 : .28), .7, .55, .08, "#f6ebe6", {
			rg: .55,
			solid: false
		}));
	}
	props.push(box(-11.2, .55, -6.4, .9, 1.1, .9, trim, { rg: .5 }), box(-9.3, 1.12, -6.4, 3.2, .08, .7, "#f4f7fb", {
		m: .85,
		rg: .12,
		solid: false
	}), cyl(-8.2, 1, -2.4, .045, 2, "#e7eef5", {
		m: 1,
		rg: .08
	}), cyl(-7.5, 1, -2.4, .045, 2, "#e7eef5", {
		m: 1,
		rg: .08
	}), box(-7.85, .45, -2.4, .7, .05, .12, "#e7eef5", {
		m: 1,
		rg: .08,
		solid: false
	}), box(-7.85, .9, -2.4, .7, .05, .12, "#e7eef5", {
		m: 1,
		rg: .08,
		solid: false
	}), box(-7.85, 1.35, -2.4, .7, .05, .12, "#e7eef5", {
		m: 1,
		rg: .08,
		solid: false
	}), sph(4.2, .28, -1.6, .28, "#e24b4b", {
		m: .15,
		rg: .35
	}), {
		t: "torus",
		p: [
			6.4,
			.45,
			3.4
		],
		s: [
			.42,
			.09,
			0
		],
		r: [
			Math.PI / 2.4,
			.2,
			.4
		],
		c: "#f6ebe6",
		solid: false,
		cast: true,
		m: .2,
		rg: .45
	}, box(0, 4.55, 0, 2.4, .08, .35, "#fff4e4", {
		e: "#fff1d2",
		ei: 1.4,
		solid: false,
		cast: false
	}), box(-7, 4.55, -4, 1.8, .08, .28, "#fff4e4", {
		e: "#fff1d2",
		ei: 1.1,
		solid: false,
		cast: false
	}), box(7, 4.55, -4, 1.8, .08, .28, "#fff4e4", {
		e: "#fff1d2",
		ei: 1.1,
		solid: false,
		cast: false
	}), {
		t: "plane",
		p: [
			0,
			2.55,
			10.96
		],
		s: [
			1.5,
			1.5,
			0
		],
		r: [
			0,
			Math.PI,
			0
		],
		c: "#f6ebe6",
		sign: "3:17",
		solid: false,
		cast: false
	}, {
		t: "plane",
		p: [
			0,
			2.35,
			-10.95
		],
		s: [
			2.2,
			.48,
			0
		],
		c: "#ff7aa2",
		sign: "TOVÁBB",
		solid: false,
		cast: false
	}, box(12.6, 1.5, 8.2, .08, .9, 1.4, "#d7e7f2", {
		e: "#ffe7c2",
		ei: .35,
		solid: false,
		cast: false,
		m: .1,
		rg: .15
	}), box(-12.6, 1.5, 8.2, .08, .9, 1.4, "#d7e7f2", {
		e: "#ffe7c2",
		ei: .35,
		solid: false,
		cast: false
	}));
	return finish({
		id: "medence",
		name: "Medence, 3:17",
		index: "01",
		blurb: "A víz meleg, pedig senki nem fűt.",
		spawn: {
			x: 0,
			y: .05,
			z: 7.2,
			yaw: 0
		},
		sky: {
			zenith: "#f3b7c8",
			horizon: "#ffe4d4",
			ground: "#c98b9c"
		},
		fog: {
			color: "#f0d5dc",
			near: 14,
			far: 36
		},
		sun: {
			position: [
				6,
				12,
				4
			],
			intensity: .55,
			color: "#ffe0ea"
		},
		ambient: .62,
		hemi: [
			"#ffe4ea",
			"#e7b8c4",
			.45
		],
		exposure: 1.06,
		floor: {
			w: 30,
			d: 22,
			cx: 0,
			cz: 0,
			y: .012,
			color: "#f0c3d0",
			roughness: .18,
			metalness: .55,
			mirror: .82,
			distortion: .22,
			strength: 1.15
		},
		orbit: [0, .5],
		orbitR: 5.2,
		orbitY: 1.85,
		lights: [
			{
				p: [
					0,
					4.2,
					0
				],
				color: "#fff1dc",
				intensity: 8,
				dist: 16
			},
			{
				p: [
					-7,
					4.1,
					-4
				],
				color: "#ffe4ea",
				intensity: 4,
				dist: 12
			},
			{
				p: [
					7,
					4.1,
					-4
				],
				color: "#ffe4ea",
				intensity: 4,
				dist: 12
			}
		],
		props,
		extras: [floorBox(-15, 15, -11, 11)],
		memories: [
			{
				id: "medence-1",
				title: "Csempe",
				body: "A csempe meleg. A szűrő nem megy, mégis tiszta a víz.",
				p: [
					4.6,
					1.25,
					2.2
				]
			},
			{
				id: "medence-2",
				title: "Törölköző",
				body: "Valaki hagyott egy törölközőt. Száraz, és mégis nedves a padló körülötte.",
				p: [
					-5.2,
					1.2,
					-1.4
				]
			},
			{
				id: "medence-3",
				title: "3:17",
				body: "3:17. Mindig 3:17. A mutató mintha nem is üveg alatt lenne.",
				p: [
					1.4,
					1.35,
					-6.4
				]
			}
		],
		portal: {
			x: 0,
			z: -9.4,
			to: "poolrooms",
			label: "A medencék"
		}
	});
}
function buildStreet() {
	const wall = "#f0d2c2";
	const roof = "#c4787a";
	const props = [];
	for (const z of [
		-24,
		-12,
		0,
		12,
		24
	]) for (const side of [-1, 1]) {
		const x = side * 13.2;
		const face = side > 0 ? -1 : 1;
		props.push(box(x, 1.9, z, 7.4, 3.8, 8.2, wall, { rg: .84 }), box(x, 4.05, z, 8, .45, 8.8, roof, {
			solid: false,
			rg: .7
		}), box(x + face * 3.78, 1.15, z + 2.1, .1, 1.7, .9, "#2a2328", {
			solid: false,
			cast: false
		}), box(x + face * 3.78, 2.35, z - 1.4, .1, 1.05, 1.35, "#ffe1b0", {
			solid: false,
			cast: false,
			e: "#ffe1b0",
			ei: .45
		}), box(x + face * 3.78, 2.35, z + 2.3, .1, 1.05, 1.15, "#d5e6ef", {
			solid: false,
			cast: false,
			e: "#d5eaf5",
			ei: .28
		}));
	}
	for (const z of [
		-16,
		4,
		18
	]) for (const x of [-7.2, 7.2]) props.push(cyl(x, 1.7, z, .07, 3.4, "#3a3336", {
		m: .4,
		rg: .4
	}), sph(x, 3.45, z, .22, "#fff1d2", {
		e: "#ffe7b8",
		ei: 1.3,
		cast: false
	}));
	props.push(box(4.6, .7, 14.5, 1.8, 1.2, 4.2, "#e7b7c4", {
		m: .45,
		rg: .35
	}), box(4.6, 1.15, 14.5, 1.7, .45, 2.2, "#f6ebe6", {
		solid: false,
		m: .1,
		rg: .2,
		trans: .35
	}), cyl(-5.5, .9, -6, .08, 1.8, "#3a3336"), cyl(5.5, .9, -6, .08, 1.8, "#3a3336"), box(0, 2.55, -6, 11.2, .08, .08, "#3a3336", { solid: false }), box(0, .04, 2, 1.1, .02, 7, "#f6ebe6", {
		solid: false,
		cast: false
	}), box(0, .04, -10, 1.1, .02, 7, "#f6ebe6", {
		solid: false,
		cast: false
	}), box(0, .04, -22, 1.1, .02, 7, "#f6ebe6", {
		solid: false,
		cast: false
	}));
	for (const z of [
		-28,
		-8,
		8,
		28
	]) for (const x of [-20, 20]) props.push(cyl(x, 1.3, z, .18, 2.6, "#6d5a52", { rg: .9 }), sph(x, 3.1, z, 1.35, "#9a6d74", {
		solid: false,
		rg: .85,
		cast: true
	}));
	props.push({
		t: "plane",
		p: [
			0,
			2.2,
			-30.4
		],
		s: [
			2.4,
			.5,
			0
		],
		c: "#ff7aa2",
		sign: "A FOLYOSÓ",
		solid: false,
		cast: false
	});
	return finish({
		id: "utca",
		name: "Ugyanaz az utca",
		index: "03",
		blurb: "Minden ház ugyanazt az ablakot nézi.",
		spawn: {
			x: 0,
			y: .05,
			z: 6,
			yaw: 0
		},
		sky: {
			zenith: "#f0a0b0",
			horizon: "#ffd0a4",
			ground: "#c47d88"
		},
		fog: {
			color: "#e7c2b4",
			near: 10,
			far: 48
		},
		sun: {
			position: [
				-18,
				14,
				10
			],
			intensity: 1.45,
			color: "#ffc8a4"
		},
		ambient: .42,
		hemi: [
			"#ffd0c0",
			"#8a6670",
			.38
		],
		exposure: 1.08,
		floor: {
			w: 54,
			d: 70,
			cx: 0,
			cz: -2,
			y: .012,
			color: "#3a3236",
			roughness: .28,
			metalness: .62,
			mirror: .72,
			distortion: .08,
			strength: .9
		},
		orbit: [0, 2],
		orbitR: 5.2,
		orbitY: 2.5,
		lights: [
			{
				p: [
					-7.2,
					3.3,
					-16
				],
				color: "#ffe1a8",
				intensity: 6,
				dist: 14
			},
			{
				p: [
					7.2,
					3.3,
					4
				],
				color: "#ffe1a8",
				intensity: 6,
				dist: 14
			},
			{
				p: [
					-7.2,
					3.3,
					18
				],
				color: "#ffe1a8",
				intensity: 5,
				dist: 12
			}
		],
		props,
		extras: [...wallRing(-26, 26, -34, 34, 6), floorBox(-26, 26, -34, 34)],
		memories: [
			{
				id: "utca-1",
				title: "Név",
				body: "Minden postaládán ugyanaz a név, csak a házszám más.",
				p: [
					-2.2,
					1.2,
					2
				]
			},
			{
				id: "utca-2",
				title: "Hinta",
				body: "A hinta magától áll meg, amikor közelebb lépsz.",
				p: [
					.4,
					1.15,
					-6
				]
			},
			{
				id: "utca-3",
				title: "Tévé",
				body: "Az ablakokban tévé szól, pedig egyik házban sincs konnektor.",
				p: [
					2.2,
					1.2,
					-18
				]
			}
		],
		portal: {
			x: 0,
			z: -31.2,
			to: "folyoso",
			label: "A folyosó"
		}
	});
}
function buildHall() {
	const wall = "#efe6dc";
	const locker = "#6e8c7e";
	const props = [
		box(0, 1.6, -.25, 7.2, 3.2, .4, wall),
		box(0, 1.6, 49.7, 7.2, 3.2, .4, wall),
		box(-3.55, 1.6, 25, .4, 3.2, 50, wall),
		box(3.55, 1.6, 8, .4, 3.2, 16, wall),
		box(3.55, 1.6, 38, .4, 3.2, 24, wall),
		box(6.4, 1.6, 15.1, 6.2, 3.2, .35, wall),
		box(6.4, 1.6, 26.9, 6.2, 3.2, .35, wall),
		box(9.35, 1.6, 21, .4, 3.2, 12, wall),
		box(0, 3.28, 25, 6.6, .22, 50, "#f7f1ea", {
			cast: false,
			rg: .9
		}),
		box(6.4, 3.28, 21, 5.6, .22, 11.4, "#f7f1ea", {
			cast: false,
			rg: .9
		}),
		box(6.5, .78, 20.2, 1.4, .12, .7, "#c9b39a", { rg: .6 }),
		box(6.5, 1.15, 19.85, 1.4, .6, .08, "#c9b39a", { solid: false }),
		box(7.6, 1.35, 23.4, .7, .9, 1.3, "#d7c4ae", { rg: .7 })
	];
	const lockerZ = [];
	for (let z = 2.2; z < 46; z += 2.25) lockerZ.push(z);
	for (const z of lockerZ) {
		props.push(box(-2.85, 1.05, z, .55, 2.05, .78, locker, {
			m: .45,
			rg: .38
		}));
		if (z < 13.5 || z > 28.5) props.push(box(2.85, 1.05, z, .55, 2.05, .78, locker, {
			m: .45,
			rg: .38
		}));
	}
	for (const z of [
		6,
		18,
		30,
		42
	]) props.push(box(0, 3.12, z, 1.6, .06, .28, "#fff6e6", {
		e: "#fff3d6",
		ei: 1.5,
		solid: false,
		cast: false
	}));
	props.push({
		t: "plane",
		p: [
			-3.3,
			1.7,
			11
		],
		s: [
			.9,
			1.15,
			0
		],
		r: [
			0,
			Math.PI / 2,
			0
		],
		c: "#f6ebe6",
		sign: "CSENGETÉS ELMARAD",
		solid: false,
		cast: false
	}, {
		t: "plane",
		p: [
			3.3,
			1.7,
			34
		],
		s: [
			.9,
			1.15,
			0
		],
		r: [
			0,
			-Math.PI / 2,
			0
		],
		c: "#f6ebe6",
		sign: "NE FUTSJ",
		solid: false,
		cast: false
	}, {
		t: "plane",
		p: [
			0,
			2.35,
			49.42
		],
		s: [
			2.3,
			.46,
			0
		],
		c: "#ff7aa2",
		sign: "KIJÁRAT",
		solid: false,
		cast: false
	}, box(8.2, 1.6, 24.6, .08, 1.1, 1.6, "#d5e6ef", {
		e: "#ffe7c4",
		ei: .4,
		solid: false,
		cast: false
	}));
	return finish({
		id: "folyoso",
		name: "A folyosó vége",
		index: "04",
		blurb: "A menza illata van, pedig ez csak egy folyosó.",
		spawn: {
			x: 0,
			y: .05,
			z: 3.2,
			yaw: Math.PI
		},
		sky: {
			zenith: "#f0e4da",
			horizon: "#f7efe6",
			ground: "#d9cfc4"
		},
		fog: {
			color: "#e7ddd2",
			near: 6,
			far: 24
		},
		sun: {
			position: [
				2,
				8,
				10
			],
			intensity: .22,
			color: "#fff0e4"
		},
		ambient: .58,
		hemi: [
			"#fff4ea",
			"#cbb8aa",
			.35
		],
		exposure: 1.02,
		floor: {
			w: 14,
			d: 54,
			cx: 2.2,
			cz: 24.5,
			y: .012,
			color: "#d9cbb8",
			roughness: .32,
			metalness: .35,
			mirror: .55,
			distortion: .04,
			strength: .65
		},
		orbit: [0, 12],
		orbitR: 1.15,
		orbitY: 1.55,
		lights: [
			{
				p: [
					0,
					2.9,
					6
				],
				color: "#fff6e8",
				intensity: 6,
				dist: 12
			},
			{
				p: [
					0,
					2.9,
					18
				],
				color: "#fff6e8",
				intensity: 6,
				dist: 12
			},
			{
				p: [
					0,
					2.9,
					32
				],
				color: "#fff6e8",
				intensity: 6,
				dist: 12
			},
			{
				p: [
					0,
					2.9,
					44
				],
				color: "#fff4e4",
				intensity: 5,
				dist: 11
			}
		],
		props,
		extras: [floorBox(-3.3, 9.2, 0, 49.4)],
		memories: [
			{
				id: "folyoso-1",
				title: "Szekrény",
				body: "A szekrények zárva. Belül mégis ruha susog.",
				p: [
					.2,
					1.25,
					9
				]
			},
			{
				id: "folyoso-2",
				title: "Menza",
				body: "A menza illata van, pedig ez csak egy folyosó.",
				p: [
					6.4,
					1.3,
					21
				]
			},
			{
				id: "folyoso-3",
				title: "Tábla",
				body: "A kijárat táblája zöld volt. Most a rózsaszín a szabály.",
				p: [
					.3,
					1.25,
					40
				]
			}
		],
		portal: {
			x: 0,
			z: 46.6,
			to: "jatszo",
			label: "A játszótér"
		}
	});
}
function buildPlay() {
	const props = [
		box(-4.2, .18, 1.4, 1.3, .36, .9, "#e24b4b", { rg: .55 }),
		box(-4.2, .42, .45, 1.3, .42, .9, "#e24b4b", { rg: .55 }),
		box(-4.2, .68, -.45, 1.3, .46, .9, "#e24b4b", { rg: .55 }),
		box(-4.2, .62, -1.9, 1.15, .08, 2.3, "#f0c36a", {
			solid: false,
			r: [
				.42,
				0,
				0
			],
			rg: .4
		}),
		cyl(3.15, 1.35, 1.6, .07, 2.7, "#3a3336"),
		cyl(4.85, 1.35, 1.6, .07, 2.7, "#3a3336"),
		box(4, 2.65, 1.6, 1.9, .08, .08, "#3a3336", { solid: false }),
		cyl(0, .45, -6.2, .16, .9, "#f0c36a", {
			m: .4,
			rg: .35
		}),
		box(7.2, .22, -4, .9, .44, .9, "#f6ebe6"),
		box(7.2, .48, -4.85, .9, .48, .9, "#f6ebe6"),
		box(7.2, .74, -5.7, .9, .5, .9, "#e7e2dc"),
		box(-8, .32, 4.5, 1.6, .42, .55, "#c98488", { rg: .6 })
	];
	for (const [x, z] of [
		[-14, -12],
		[14, -10],
		[-15, 10],
		[13, 12],
		[-6, -14],
		[10, -14]
	]) props.push(cyl(x, 1.15, z, .16, 2.3, "#6d5a52", { rg: .9 }), sph(x, 2.7, z, 1.15, "#b7c4b4", {
		solid: false,
		rg: .9
	}));
	props.push({
		t: "plane",
		p: [
			0,
			2.3,
			-16.3
		],
		s: [
			2.4,
			.48,
			0
		],
		c: "#ff7aa2",
		sign: "MOTEL",
		solid: false,
		cast: false
	});
	return finish({
		id: "jatszo",
		name: "Ködös játszótér",
		index: "05",
		blurb: "A körhinta le van maradva a saját zenéjétől.",
		spawn: {
			x: 0,
			y: .05,
			z: 10.5,
			yaw: 0
		},
		sky: {
			zenith: "#d7c6e0",
			horizon: "#f3d5dc",
			ground: "#b7a8b0"
		},
		fog: {
			color: "#e4d5dc",
			near: 4,
			far: 26
		},
		sun: {
			position: [
				8,
				16,
				6
			],
			intensity: .85,
			color: "#ffd5e4"
		},
		ambient: .55,
		hemi: [
			"#f6e4ea",
			"#9a8c94",
			.4
		],
		exposure: 1.05,
		floor: {
			w: 42,
			d: 40,
			cx: 0,
			cz: -1,
			y: .012,
			color: "#8d9790",
			roughness: .42,
			metalness: .28,
			mirror: .42,
			distortion: .05,
			strength: .55
		},
		orbit: [0, -1],
		orbitR: 7,
		orbitY: 2.3,
		lights: [{
			p: [
				0,
				2.2,
				-15
			],
			color: "#ffb7cc",
			intensity: 5,
			dist: 12
		}, {
			p: [
				4,
				2.4,
				1.6
			],
			color: "#ffe1b0",
			intensity: 2.2,
			dist: 8
		}],
		props,
		extras: [...wallRing(-18, 18, -18, 16, 5), floorBox(-18, 18, -18, 16)],
		memories: [
			{
				id: "jatszo-1",
				title: "Körhinta",
				body: "A körhinta zenéje le van maradva a forgástól.",
				p: [
					1.6,
					1.2,
					-6.2
				]
			},
			{
				id: "jatszo-2",
				title: "Homok",
				body: "A homokozóban nincs homok. Ujjlenyomat mégis van.",
				p: [
					-6.2,
					1.15,
					2.4
				]
			},
			{
				id: "jatszo-3",
				title: "Köd",
				body: "A köd a térdedig ér, és hidegebb, mint a levegő.",
				p: [
					3.4,
					1.2,
					-10
				]
			}
		],
		portal: {
			x: 0,
			z: -15.2,
			to: "motel",
			label: "A motel"
		}
	});
}
function buildMotel() {
	const props = [box(-12.4, 3.3, 0, 10.6, 6.6, 22, "#e7d5c6", { rg: .86 }), box(-12.4, 6.75, 0, 11.2, .4, 22.6, "#c9a898", {
		solid: false,
		rg: .7
	})];
	for (const z of [
		-8,
		-4,
		0,
		4,
		8
	]) props.push(box(-7.02, 1.7, z, .08, 1.15, 1.35, "#2a2328", {
		solid: false,
		cast: false
	}), box(-7.02, 4.5, z, .08, 1.05, 1.25, "#ffd7b0", {
		solid: false,
		cast: false,
		e: z === 0 ? "#ffd7b0" : "#c9d7e4",
		ei: z === 0 ? .7 : .18
	}));
	props.push(box(-6.95, 1.15, 3.2, .12, 2.1, 1.05, "#f6ebe6", {
		e: "#fff1dc",
		ei: .55,
		solid: false,
		cast: false
	}), {
		t: "plane",
		p: [
			-6.7,
			5.7,
			0
		],
		s: [
			6.2,
			1.15,
			0
		],
		r: [
			0,
			Math.PI / 2,
			0
		],
		c: "#ff7aa2",
		sign: "VAN HELY",
		solid: false,
		cast: false
	}, box(-4.2, 1.15, -7.4, .8, 2.1, .7, "#8c4558", {
		m: .25,
		rg: .4
	}), box(-3.95, 1.05, -7.4, .08, 1.2, .45, "#1a1214", {
		solid: false,
		e: "#9ad7ff",
		ei: .35
	}), box(3.2, .55, -6.5, 1.9, 1.05, 4.1, "#d7b7c0", {
		m: .5,
		rg: .32
	}), box(3.2, .95, -5.2, 1.5, .4, 1.6, "#2a2428", {
		solid: false,
		m: .2,
		rg: .15
	}), cyl(6.5, .35, 5.5, .55, .5, "#c98488", {
		m: .3,
		rg: .45
	}), box(8.4, .28, 2.2, .7, .4, .45, "#f0c36a", { rg: .6 }), {
		t: "plane",
		p: [
			-6.85,
			2.55,
			3.2
		],
		s: [
			.7,
			.32,
			0
		],
		r: [
			0,
			Math.PI / 2,
			0
		],
		c: "#f0c36a",
		sign: "12",
		solid: false,
		cast: false
	});
	return finish({
		id: "motel",
		name: "Motel, 1998",
		index: "06",
		blurb: "A neonból hiányzik egy betű. Mégis kiolvasod.",
		spawn: {
			x: 8.5,
			y: .05,
			z: 3.5,
			yaw: Math.PI / 2
		},
		sky: {
			zenith: "#24182c",
			horizon: "#5c3a48",
			ground: "#140e12"
		},
		fog: {
			color: "#1c1418",
			near: 8,
			far: 40
		},
		sun: {
			position: [
				-6,
				14,
				8
			],
			intensity: .18,
			color: "#b9c4e8"
		},
		ambient: .3,
		hemi: [
			"#3a2a38",
			"#140e12",
			.28
		],
		exposure: 1.02,
		floor: {
			w: 46,
			d: 36,
			cx: 0,
			cz: 0,
			y: .012,
			color: "#2a2328",
			roughness: .22,
			metalness: .7,
			mirror: .88,
			distortion: .12,
			strength: 1.25
		},
		orbit: [1.5, 1],
		orbitR: 6,
		orbitY: 2.4,
		lights: [
			{
				p: [
					-5.2,
					5.4,
					0
				],
				color: "#ff7aa2",
				intensity: 14,
				dist: 18
			},
			{
				p: [
					-4,
					2.2,
					3.2
				],
				color: "#fff1dc",
				intensity: 6,
				dist: 9
			},
			{
				p: [
					-4.2,
					2.2,
					-7.4
				],
				color: "#9ad7ff",
				intensity: 3.5,
				dist: 8
			}
		],
		props,
		extras: [...wallRing(-22, 20, -16, 16, 8), floorBox(-22, 20, -16, 16)],
		memories: [
			{
				id: "motel-1",
				title: "Neon",
				body: "A neonból hiányzik egy betű. Mégis ki tudod olvasni: van hely.",
				p: [
					-2.2,
					1.3,
					.4
				]
			},
			{
				id: "motel-2",
				title: "12-es",
				body: "A 12-es szoba kulcsa a pulton van. A szoba nem szerepel a térképen.",
				p: [
					-3.2,
					1.25,
					3.4
				]
			},
			{
				id: "motel-3",
				title: "Tócsa",
				body: "A parkoló tócsájában hold látszik. Ma nincs hold.",
				p: [
					4.5,
					1.2,
					6.2
				]
			}
		],
		portal: {
			x: -4.6,
			z: 3.2,
			to: "szoba",
			label: "12-es szoba"
		}
	});
}
function buildRoom() {
	const plaster = "#efe2d8";
	const wood = "#6a4038";
	return finish({
		id: "szoba",
		name: "12-es szoba",
		index: "07",
		blurb: "A kulcs benne van a zárban. A zár nincs bezárva.",
		spawn: {
			x: 0,
			y: .05,
			z: 4.05,
			yaw: 0
		},
		sky: {
			zenith: "#1a1218",
			horizon: "#3a2430",
			ground: "#120c10"
		},
		fog: {
			color: "#1c1418",
			near: 7,
			far: 16
		},
		sun: {
			position: [
				2,
				6,
				-4
			],
			intensity: .08,
			color: "#ffb7cc"
		},
		ambient: .28,
		hemi: [
			"#3a2a32",
			"#140e12",
			.22
		],
		exposure: 1.04,
		floor: {
			w: 8.2,
			d: 10.6,
			cx: 0,
			cz: .2,
			y: .012,
			color: "#6a3844",
			roughness: .46,
			metalness: .22,
			mirror: .42,
			distortion: .03,
			strength: .48
		},
		orbit: [0, .4],
		orbitR: 1.4,
		orbitY: 1.55,
		lights: [
			{
				p: [
					0,
					2.7,
					1.2
				],
				color: "#fff1dc",
				intensity: 7,
				dist: 11
			},
			{
				p: [
					-.85,
					1.35,
					-1.6
				],
				color: "#ffd2a8",
				intensity: 3.2,
				dist: 5
			},
			{
				p: [
					2.55,
					1.25,
					2.05
				],
				color: "#9ad7ff",
				intensity: 7,
				dist: 7
			},
			{
				p: [
					0,
					1.6,
					-4.4
				],
				color: "#ff7aa2",
				intensity: 4,
				dist: 6
			},
			{
				p: [
					3.2,
					2.3,
					-3.5
				],
				color: "#e7d2c0",
				intensity: 2.4,
				dist: 4.5
			}
		],
		props: [
			box(0, 1.55, 5.55, 8.6, 3.1, .3, plaster, { rg: .86 }),
			box(0, 1.55, -5.15, 8.6, 3.1, .3, plaster, { rg: .86 }),
			box(-4.15, 1.55, .2, .3, 3.1, 10.7, plaster, { rg: .86 }),
			box(4.15, 1.55, .2, .3, 3.1, 10.7, plaster, { rg: .86 }),
			box(0, 3.12, .2, 8, .16, 10.4, "#f3e6dc", {
				cast: false,
				rg: .92
			}),
			box(2.35, 1.55, -3.35, .12, 3.1, 3.3, plaster, { rg: .84 }),
			box(-2.15, .28, -.35, 1.9, .42, 3.3, wood, { rg: .55 }),
			box(-2.15, .58, -.35, 1.95, .22, 3.35, "#c45b78", {
				solid: false,
				rg: .7
			}),
			box(-2.15, .74, -1.7, 1.35, .16, .48, "#f6ebe6", {
				solid: false,
				rg: .8
			}),
			box(-2.15, .85, -1.95, 1.9, .7, .1, wood, {
				solid: false,
				rg: .5
			}),
			box(-.85, .3, -1.75, .48, .55, .42, wood, { rg: .48 }),
			cyl(-.85, .72, -1.75, .08, .22, "#f0c36a", {
				e: "#ffd2a8",
				ei: .9,
				solid: false,
				m: .3
			}),
			box(2.55, .36, 2.55, 1.55, .68, .48, "#3a2c30", {
				rg: .45,
				m: .2
			}),
			box(2.55, 1.05, 2.42, 1.2, .72, .1, "#1a1214", {
				solid: false,
				m: .4,
				rg: .3
			}),
			box(3.15, .28, -3.55, 1.35, .5, 2.05, "#efe6dc", {
				rg: .4,
				m: .15
			}),
			box(3.15, .5, -3.55, 1.05, .08, 1.55, "#c9a0b0", {
				solid: false,
				cast: false,
				trans: .72,
				rg: .05,
				m: .08
			}),
			box(3.9, 1.45, -3.5, .05, .85, .55, "#d5e6ef", {
				solid: false,
				cast: false,
				m: .92,
				rg: .06
			}),
			box(0, 1.55, -4.98, 2.2, 1.35, .06, "#ffb7cc", {
				solid: false,
				cast: false,
				e: "#ff7aa2",
				ei: .85,
				trans: .4,
				rg: .04
			}),
			box(-1.4, 1.55, -4.82, .28, 2.15, .08, "#c98488", {
				solid: false,
				rg: .7
			}),
			box(1.4, 1.55, -4.82, .28, 2.15, .08, "#c98488", {
				solid: false,
				rg: .7
			}),
			box(0, 2.95, 1.2, 1.8, .05, .28, "#fff6e6", {
				e: "#fff1d4",
				ei: .7,
				solid: false,
				cast: false
			}),
			cyl(3.35, 1.05, 4.35, .035, 2.1, "#3a3336", {
				m: .5,
				rg: .4
			}),
			box(3.35, .85, 4.1, .42, 1.15, .1, "#2a2328", {
				solid: false,
				rg: .8
			}),
			box(1.15, .16, 3.35, .62, .28, .4, "#5c3038", { rg: .6 }),
			box(.2, .04, .4, 1.6, .02, 2.4, "#8a4558", {
				solid: false,
				cast: false,
				rg: .85
			}),
			{
				t: "plane",
				p: [
					-1.5,
					2.25,
					5.36
				],
				s: [
					.62,
					.34,
					0
				],
				r: [
					0,
					Math.PI,
					0
				],
				c: "#f0c36a",
				sign: "12",
				solid: false,
				cast: false
			},
			{
				t: "plane",
				p: [
					.85,
					2.35,
					-4.95
				],
				s: [
					1.05,
					.4,
					0
				],
				c: "#ff7aa2",
				sign: "3:17",
				solid: false,
				cast: false
			}
		],
		extras: [floorBox(-3.95, 3.95, -4.95, 5.35)],
		memories: [
			{
				id: "szoba-1",
				title: "Kulcs",
				body: "A kulcs benne van a zárban. Senki nem fordította el.",
				p: [
					-.55,
					1.15,
					-1.15
				]
			},
			{
				id: "szoba-2",
				title: "Kép",
				body: "A tévé a medencét mutatja felülről. A vízben te állsz, pedig itt vagy.",
				p: [
					1.35,
					1.2,
					1.15
				]
			},
			{
				id: "szoba-3",
				title: "Másodperc",
				body: "A másodpercmutató megindul, aztán meggondolja magát. 3:17 marad.",
				p: [
					-1.55,
					1.3,
					-3.55
				]
			}
		],
		portal: {
			x: 0,
			z: -4.15,
			to: "medence",
			label: "A víz"
		}
	});
}
function buildPools() {
	const tile = "#efe3b4";
	const trim = "#d7c98a";
	const props = [
		box(0, 1.7, 16.15, 28.4, 3.4, .32, tile, {
			rg: .18,
			m: .12
		}),
		box(0, 1.7, -16.15, 28.4, 3.4, .32, tile, {
			rg: .18,
			m: .12
		}),
		box(-14.15, 1.7, 0, .32, 3.4, 32.2, tile, {
			rg: .18,
			m: .12
		}),
		box(14.15, 1.7, 0, .32, 3.4, 32.2, tile, {
			rg: .18,
			m: .12
		}),
		box(0, 3.42, 0, 28, .14, 32, "#f6f0d4", {
			rg: .84,
			cast: false
		}),
		box(-8, 1.7, 6.1, 11.6, 3.4, .26, tile, {
			rg: .18,
			m: .1
		}),
		box(8, 1.7, 6.1, 11.6, 3.4, .26, tile, {
			rg: .18,
			m: .1
		}),
		box(-8, 1.7, -6.1, 11.6, 3.4, .26, tile, {
			rg: .18,
			m: .1
		}),
		box(8, 1.7, -6.1, 11.6, 3.4, .26, tile, {
			rg: .18,
			m: .1
		}),
		box(-6.15, 1.7, 11.2, .26, 3.4, 9.2, tile, {
			rg: .18,
			m: .1
		}),
		box(6.15, 1.7, 11.2, .26, 3.4, 9.2, tile, {
			rg: .18,
			m: .1
		}),
		box(-6.15, 1.7, -11.2, .26, 3.4, 9.2, tile, {
			rg: .18,
			m: .1
		}),
		box(6.15, 1.7, -11.2, .26, 3.4, 9.2, tile, {
			rg: .18,
			m: .1
		})
	];
	for (const [x, z] of [
		[-3.6, -1.6],
		[3.6, -1.6],
		[-3.6, 1.6],
		[3.6, 1.6]
	]) props.push(cyl(x, 1.65, z, .2, 3.3, tile, {
		rg: .16,
		m: .16
	}));
	for (const z of [
		12.4,
		3.2,
		-2.4,
		-10.6
	]) props.push(box(0, 3.22, z, 2.6, .05, .18, "#fff8dc", {
		e: "#fff3c4",
		ei: 1.55,
		solid: false,
		cast: false
	}));
	props.push(box(-10.2, 3.22, .2, .18, .05, 2.4, "#f3fff8", {
		e: "#e9fff4",
		ei: 1.2,
		solid: false,
		cast: false
	}), box(10.2, 3.22, .2, .18, .05, 2.4, "#f3fff8", {
		e: "#e9fff4",
		ei: 1.2,
		solid: false,
		cast: false
	}), box(0, 3.2, -2.4, 1.15, .045, .14, "#ffd5e4", {
		e: "#ff7aa2",
		ei: 1.35,
		solid: false,
		cast: false
	}), box(0, .045, 0, 7.2, .04, 7.2, "#7ebdb8", {
		solid: false,
		cast: false,
		trans: .45,
		rg: .04,
		m: .08
	}), box(0, .045, 11.4, 4.2, .04, 5.4, "#8ec9c4", {
		solid: false,
		cast: false,
		trans: .4,
		rg: .04
	}), box(-10.2, .045, 0, 4.4, .04, 6.2, "#8ec9c4", {
		solid: false,
		cast: false,
		trans: .4,
		rg: .04
	}), box(10.2, .045, -2, 4.4, .04, 6.2, "#8ec9c4", {
		solid: false,
		cast: false,
		trans: .4,
		rg: .04
	}), box(-11.2, .28, 9.2, 1.4, .38, .42, "#f4efe2", { rg: .45 }), box(11.1, .28, -9.4, 1.4, .38, .42, "#f4efe2", { rg: .45 }), cyl(-1.7, .85, -1.1, .035, 1.7, "#e7eef6", {
		m: .95,
		rg: .12
	}), cyl(-1.15, .85, -1.1, .035, 1.7, "#e7eef6", {
		m: .95,
		rg: .12
	}), box(-1.42, .2, -1.1, .7, .05, .08, "#e7eef6", {
		m: .9,
		rg: .12,
		solid: false
	}), box(-1.42, .7, -1.1, .7, .05, .08, "#e7eef6", {
		m: .9,
		rg: .12,
		solid: false
	}), box(-1.42, 1.2, -1.1, .7, .05, .08, "#e7eef6", {
		m: .9,
		rg: .12,
		solid: false
	}), {
		t: "torus",
		p: [
			2.4,
			.18,
			2.2
		],
		s: [
			.42,
			.07,
			0
		],
		r: [
			Math.PI / 2.2,
			.2,
			.1
		],
		c: "#f6ebe6",
		solid: false,
		m: .15,
		rg: .4
	}, box(0, 1.15, 6.22, 1.7, .08, .08, trim, {
		solid: false,
		m: .3,
		rg: .4
	}), box(0, 1.15, -6.22, 1.7, .08, .08, trim, {
		solid: false,
		m: .3,
		rg: .4
	}), {
		t: "plane",
		p: [
			0,
			2.15,
			15.95
		],
		s: [
			1.6,
			.42,
			0
		],
		r: [
			0,
			Math.PI,
			0
		],
		c: "#f0c36a",
		sign: "1.6 m",
		solid: false,
		cast: false
	}, {
		t: "plane",
		p: [
			-13.95,
			1.7,
			2
		],
		s: [
			1.3,
			.4,
			0
		],
		r: [
			0,
			Math.PI / 2,
			0
		],
		c: "#efe3b4",
		sign: "CSEND",
		solid: false,
		cast: false
	}, {
		t: "plane",
		p: [
			0,
			2.05,
			-15.95
		],
		s: [
			2.4,
			.46,
			0
		],
		c: "#ff7aa2",
		sign: "AZ UTCA",
		solid: false,
		cast: false
	});
	return finish({
		id: "poolrooms",
		name: "Poolrooms",
		index: "02",
		blurb: "A víz áll. Mégis nyugodtabb, mint kellene.",
		spawn: {
			x: 0,
			y: .05,
			z: 12.2,
			yaw: 0
		},
		sky: {
			zenith: "#d7e6c4",
			horizon: "#f4ecd4",
			ground: "#b7c8b0"
		},
		fog: {
			color: "#e4f0ea",
			near: 10,
			far: 34
		},
		sun: {
			position: [
				4,
				10,
				6
			],
			intensity: .18,
			color: "#fff6d8"
		},
		ambient: .42,
		hemi: [
			"#f7f3df",
			"#8fb8b4",
			.34
		],
		exposure: 1.08,
		floor: {
			w: 28,
			d: 32,
			cx: 0,
			cz: 0,
			y: .012,
			color: "#8fd0cc",
			roughness: .08,
			metalness: .72,
			mirror: .94,
			distortion: .04,
			strength: 1.5
		},
		orbit: [0, 2],
		orbitR: 4.2,
		orbitY: 1.45,
		lights: [
			{
				p: [
					0,
					3.05,
					12.4
				],
				color: "#fff6d0",
				intensity: 9,
				dist: 12
			},
			{
				p: [
					0,
					3.05,
					3.2
				],
				color: "#fff6d0",
				intensity: 11,
				dist: 14
			},
			{
				p: [
					0,
					3.05,
					-2.4
				],
				color: "#ffe0ea",
				intensity: 4,
				dist: 8
			},
			{
				p: [
					0,
					3.05,
					-10.6
				],
				color: "#e9fff6",
				intensity: 9,
				dist: 12
			},
			{
				p: [
					-10,
					2.9,
					0
				],
				color: "#fff8e4",
				intensity: 6,
				dist: 10
			},
			{
				p: [
					10,
					2.9,
					0
				],
				color: "#fff8e4",
				intensity: 6,
				dist: 10
			}
		],
		props,
		extras: [floorBox(-13.9, 13.9, -15.9, 15.9)],
		memories: [
			{
				id: "poolrooms-1",
				title: "Klór",
				body: "Klórszag van, pedig ezt a medencét senki nem töltötte fel.",
				p: [
					.4,
					1.2,
					8.6
				]
			},
			{
				id: "poolrooms-2",
				title: "Csempe",
				body: "Minden csempe ugyanaz. Még a hajszálrepedés is ugyanott van.",
				p: [
					-9.2,
					1.2,
					1.2
				]
			},
			{
				id: "poolrooms-3",
				title: "Nyugalom",
				body: "A víz nem mozdul. Mégis hallod, ahogy lélegzik.",
				p: [
					.2,
					1.2,
					-10.2
				]
			}
		],
		portal: {
			x: 0,
			z: -14.6,
			to: "utca",
			label: "Az utca"
		}
	});
}
var LEVEL_LIST = [
	buildPool(),
	buildPools(),
	buildStreet(),
	buildHall(),
	buildPlay(),
	buildMotel(),
	buildRoom()
];
var BY_ID = new Map(LEVEL_LIST.map((level) => [level.id, level]));
function getLevel(id) {
	return BY_ID.get(id) ?? LEVEL_LIST[0];
}
var LEVEL_IDS = LEVEL_LIST.map((level) => level.id);
var PLAYER_H = 1.62;
var RADIUS = .32;
var STEP = .46;
var sim = {
	x: 0,
	y: .05,
	z: 7.2,
	vx: 0,
	vy: 0,
	vz: 0,
	yaw: 0,
	pitch: 0,
	speed: 0,
	grounded: false,
	playing: false,
	transitioning: false,
	keys: /* @__PURE__ */ new Set(),
	joyX: 0,
	joyY: 0,
	sprintToggle: false,
	interactHeld: false,
	jumpHeld: false,
	prevE: false,
	prevJ: false,
	useLock: 0,
	portalLock: 2,
	sens: .00215,
	invertY: false,
	invertX: false,
	boxes: [],
	memories: [],
	nearId: null,
	portalX: 0,
	portalZ: -9,
	portalTo: "utca",
	portalLabel: "",
	levelId: "medence",
	playSeconds: 0,
	stepCool: 0,
	bob: 0,
	onUse: void 0,
	onPortal: void 0,
	onPrompt: void 0,
	onStep: void 0
};
var acc = 0;
var lastPrompt = "";
function reducedMotion$1() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function overlap(b) {
	const minX = sim.x - RADIUS;
	const maxX = sim.x + RADIUS;
	const minY = sim.y;
	const maxY = sim.y + PLAYER_H;
	const minZ = sim.z - RADIUS;
	const maxZ = sim.z + RADIUS;
	const ox = Math.min(maxX, b.maxX) - Math.max(minX, b.minX);
	const oy = Math.min(maxY, b.maxY) - Math.max(minY, b.minY);
	const oz = Math.min(maxZ, b.maxZ) - Math.max(minZ, b.minZ);
	if (ox > 0 && oy > 0 && oz > 0) return {
		ox,
		oy,
		oz
	};
	return null;
}
function collide(axis) {
	for (let iter = 0; iter < 4; iter++) {
		let hit = false;
		for (const b of sim.boxes) {
			const o = overlap(b);
			if (!o) continue;
			if (axis === "y") {
				const mid = (b.minY + b.maxY) / 2;
				if (sim.y + PLAYER_H * .5 < mid) {
					sim.y -= o.oy;
					if (sim.vy > 0) sim.vy = 0;
				} else {
					sim.y += o.oy;
					if (sim.vy < 0) sim.vy = 0;
					sim.grounded = true;
				}
				hit = true;
			} else if (axis === "x") {
				const rise = b.maxY - sim.y;
				if (b.maxY - b.minY <= .55 && rise > .001 && rise <= STEP) {
					sim.y = b.maxY;
					sim.grounded = true;
					if (sim.vy < 0) sim.vy = 0;
					continue;
				}
				const mid = (b.minX + b.maxX) / 2;
				sim.x += sim.x < mid ? -o.ox : o.ox;
				sim.vx = 0;
				hit = true;
			} else {
				const rise = b.maxY - sim.y;
				if (b.maxY - b.minY <= .55 && rise > .001 && rise <= STEP) {
					sim.y = b.maxY;
					sim.grounded = true;
					if (sim.vy < 0) sim.vy = 0;
					continue;
				}
				const mid = (b.minZ + b.maxZ) / 2;
				sim.z += sim.z < mid ? -o.oz : o.oz;
				sim.vz = 0;
				hit = true;
			}
		}
		if (!hit) break;
	}
}
function resolveAll() {
	for (let i = 0; i < 8; i++) {
		collide("y");
		collide("x");
		collide("z");
	}
}
function tick(dt) {
	let f = 0;
	let r = 0;
	if (sim.keys.has("KeyW") || sim.keys.has("ArrowUp")) f += 1;
	if (sim.keys.has("KeyS") || sim.keys.has("ArrowDown")) f -= 1;
	if (sim.keys.has("KeyD") || sim.keys.has("ArrowRight")) r += 1;
	if (sim.keys.has("KeyA") || sim.keys.has("ArrowLeft")) r -= 1;
	f += sim.joyY;
	r += sim.joyX;
	const len = Math.hypot(f, r);
	if (len > 1) {
		f /= len;
		r /= len;
	}
	const max = sim.keys.has("ShiftLeft") || sim.keys.has("ShiftRight") || sim.sprintToggle ? 6.15 : 3.35;
	const fx = -Math.sin(sim.yaw);
	const fz = -Math.cos(sim.yaw);
	const rx = Math.cos(sim.yaw);
	const rz = -Math.sin(sim.yaw);
	const tx = (fx * f + rx * r) * max;
	const tz = (fz * f + rz * r) * max;
	const k = 1 - Math.exp(-14 * dt);
	sim.vx += (tx - sim.vx) * k;
	sim.vz += (tz - sim.vz) * k;
	sim.vy += -22 * dt;
	if (sim.vy < -18) sim.vy = -18;
	const jump = sim.keys.has("Space") || sim.jumpHeld;
	if (jump && !sim.prevJ && sim.grounded) sim.vy = 5.15;
	sim.prevJ = jump;
	sim.grounded = false;
	sim.y += sim.vy * dt;
	collide("y");
	sim.x += sim.vx * dt;
	collide("x");
	sim.z += sim.vz * dt;
	collide("z");
	sim.speed = Math.hypot(sim.vx, sim.vz);
	const moving = sim.grounded && sim.speed > .4 && !reducedMotion$1();
	sim.bob += moving ? sim.speed * dt * 2.1 : dt * .6;
	sim.playSeconds += dt;
	sim.portalLock = Math.max(0, sim.portalLock - dt);
	sim.useLock = Math.max(0, sim.useLock - dt);
	sim.stepCool -= dt;
	if (sim.grounded && sim.speed > 1.25 && sim.stepCool <= 0) {
		sim.stepCool = sim.speed > 5 ? .32 : .46;
		sim.onStep?.();
	}
	let near = null;
	let best = 1.85 * 1.85;
	for (const m of sim.memories) {
		const dx = sim.x - m.p[0];
		const dz = sim.z - m.p[2];
		const d = dx * dx + dz * dz;
		if (d < best) {
			best = d;
			near = m.id;
		}
	}
	sim.nearId = near;
	const pdx = sim.x - sim.portalX;
	const pdz = sim.z - sim.portalZ;
	const nearPortal = pdx * pdx + pdz * pdz < 6.25;
	const prompt = near ? "E  ·  emlék" : nearPortal ? `Belépés  ·  ${sim.portalLabel}` : "";
	if (prompt !== lastPrompt) {
		lastPrompt = prompt;
		sim.onPrompt?.(prompt);
	}
	const useDown = sim.keys.has("KeyE") || sim.interactHeld;
	if (useDown && !sim.prevE && sim.useLock <= 0 && near) sim.onUse?.();
	sim.prevE = useDown;
	if (!sim.transitioning && sim.portalLock <= 0 && pdx * pdx + pdz * pdz < 1.44) sim.onPortal?.(sim.portalTo);
}
function frame(dt) {
	if (!sim.playing) {
		sim.speed = 0;
		acc = 0;
		return;
	}
	acc += Math.min(dt, .1);
	const h = 1 / 60;
	let n = 0;
	while (acc >= h && n < 6) {
		tick(h);
		acc -= h;
		n += 1;
	}
}
function syncSettings(s) {
	sim.sens = .00215 * s.sensitivity;
	sim.invertY = s.invertY;
	sim.invertX = Boolean(s.invertX);
}
function installProbe() {
	if (typeof window === "undefined") return;
	window.__controlsTest = {
		getYaw: () => sim.yaw,
		getSpeed: () => sim.speed,
		getPos: () => ({
			x: sim.x,
			y: sim.y,
			z: sim.z
		}),
		setKeys: (codes) => {
			sim.keys = new Set(codes);
		},
		reset: () => {
			sim.x = 0;
			sim.y = .05;
			sim.z = 0;
			sim.yaw = 0;
			sim.pitch = 0;
			sim.vx = 0;
			sim.vy = 0;
			sim.vz = 0;
			sim.playing = true;
			sim.transitioning = false;
		}
	};
}
var AUTO = "rozsaszin-ora:auto";
var SLOT = (n) => `rozsaszin-ora:slot:${n}`;
var SETTINGS = "rozsaszin-ora:settings";
function storage() {
	try {
		if (typeof localStorage === "undefined") return null;
		const k = "__ora";
		localStorage.setItem(k, "1");
		localStorage.removeItem(k);
		return localStorage;
	} catch {
		return null;
	}
}
function num(v, fallback = 0) {
	return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}
function defaultSettings() {
	return {
		sensitivity: 1,
		volume: .65,
		invertY: false,
		invertX: false,
		quality: "max",
		explicitQuality: false
	};
}
function asQuality(v) {
	return v === "low" || v === "high" || v === "max" ? v : "max";
}
function normalizeSave(raw) {
	if (!raw || typeof raw !== "object") return null;
	const o = raw;
	if (typeof o.levelId !== "string" || !LEVEL_IDS.includes(o.levelId)) return null;
	const settingsIn = o.settings ?? {};
	const settings = {
		...defaultSettings(),
		...settingsIn,
		quality: asQuality(settingsIn.quality),
		sensitivity: Math.min(2.4, Math.max(.35, num(settingsIn.sensitivity, 1))),
		volume: Math.min(1, Math.max(0, num(settingsIn.volume, .65))),
		invertY: Boolean(settingsIn.invertY),
		invertX: Boolean(settingsIn.invertX),
		explicitQuality: Boolean(settingsIn.explicitQuality)
	};
	const collected = Array.isArray(o.collected) ? o.collected.filter((id) => typeof id === "string") : [];
	const visited = Array.isArray(o.visited) ? o.visited.filter((id) => typeof id === "string") : [o.levelId];
	return {
		version: 1,
		updatedAt: num(o.updatedAt, Date.now()),
		levelId: o.levelId,
		x: num(o.x),
		y: num(o.y, .05),
		z: num(o.z),
		yaw: num(o.yaw),
		pitch: Math.min(1.15, Math.max(-1.15, num(o.pitch))),
		collected,
		visited,
		playSeconds: Math.max(0, num(o.playSeconds)),
		settings
	};
}
function readKey(key) {
	const ls = storage();
	if (!ls) return null;
	for (const name of [key, `${key}:bak`]) {
		const raw = ls.getItem(name);
		if (!raw) continue;
		try {
			const parsed = normalizeSave(JSON.parse(raw));
			if (parsed) return parsed;
		} catch {}
	}
	return null;
}
function writeKey(key, data) {
	const ls = storage();
	if (!ls) return false;
	try {
		const prev = ls.getItem(key);
		if (prev) ls.setItem(`${key}:bak`, prev);
		ls.setItem(key, JSON.stringify(data));
		return true;
	} catch {
		return false;
	}
}
function capture() {
	const s = useGame.getState();
	return {
		version: 1,
		updatedAt: Date.now(),
		levelId: s.levelId,
		x: sim.x,
		y: sim.y,
		z: sim.z,
		yaw: sim.yaw,
		pitch: sim.pitch,
		collected: s.collected,
		visited: s.visited,
		playSeconds: sim.playSeconds,
		settings: {
			sensitivity: s.sensitivity,
			volume: s.volume,
			invertY: s.invertY,
			invertX: s.invertX,
			quality: s.quality,
			explicitQuality: true
		}
	};
}
function saveAuto() {
	if (useGame.getState().mode === "title" && sim.playSeconds < .2) return false;
	return writeKey(AUTO, capture());
}
function saveSlot(n) {
	const data = capture();
	const ok = writeKey(SLOT(n), data);
	writeKey(AUTO, data);
	return ok;
}
function loadAuto() {
	return readKey(AUTO);
}
function loadSlot(n) {
	return readKey(SLOT(n));
}
function deleteSlot(n) {
	const ls = storage();
	if (!ls) return;
	ls.removeItem(SLOT(n));
	ls.removeItem(`${SLOT(n)}:bak`);
}
function newestSave() {
	const all = [
		loadAuto(),
		loadSlot(1),
		loadSlot(2),
		loadSlot(3)
	].filter((s) => !!s);
	all.sort((a, b) => b.updatedAt - a.updatedAt);
	return all[0] ?? null;
}
function hasAnySave() {
	return newestSave() !== null;
}
function loadSettings() {
	const ls = storage();
	if (!ls) return null;
	try {
		const raw = ls.getItem(SETTINGS);
		if (!raw) return null;
		const o = JSON.parse(raw);
		return {
			...defaultSettings(),
			...o,
			quality: asQuality(o.quality),
			explicitQuality: Boolean(o.explicitQuality)
		};
	} catch {
		return null;
	}
}
function saveSettings(partial) {
	const next = {
		...loadSettings() ?? defaultSettings(),
		...partial
	};
	const ls = storage();
	if (!ls) return;
	try {
		ls.setItem(SETTINGS, JSON.stringify(next));
	} catch {}
}
function exportSave() {
	const blob = new Blob([JSON.stringify(capture(), null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "rozsaszin-ora-mentes.json";
	a.click();
	URL.revokeObjectURL(url);
}
function parseImport(text) {
	try {
		return normalizeSave(JSON.parse(text));
	} catch {
		return null;
	}
}
function levelName(id) {
	return getLevel(id).name;
}
function formatWhen(ms) {
	try {
		return new Date(ms).toLocaleString("hu-HU", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	} catch {
		return "";
	}
}
function formatPlay(sec) {
	const m = Math.floor(sec / 60);
	if (m < 1) return "1 percnél kevesebb";
	return `${m} perc`;
}
function lookLock() {
	try {
		document.querySelector("canvas")?.requestPointerLock?.();
	} catch {}
}
function applyLevel(id, pose) {
	const level = getLevel(id);
	sim.boxes = level.boxes;
	sim.memories = level.memories;
	sim.portalX = level.portal.x;
	sim.portalZ = level.portal.z;
	sim.portalTo = level.portal.to;
	sim.portalLabel = level.portal.label;
	sim.levelId = level.id;
	sim.x = pose?.x ?? level.spawn.x;
	sim.y = pose?.y ?? level.spawn.y;
	sim.z = pose?.z ?? level.spawn.z;
	sim.yaw = pose?.yaw ?? level.spawn.yaw;
	sim.pitch = pose?.pitch ?? 0;
	if (!Number.isFinite(sim.x) || Math.abs(sim.x) > 90 || Math.abs(sim.z) > 90) {
		sim.x = level.spawn.x;
		sim.y = level.spawn.y;
		sim.z = level.spawn.z;
		sim.yaw = level.spawn.yaw;
	}
	sim.vx = 0;
	sim.vy = 0;
	sim.vz = 0;
	sim.portalLock = 1.7;
	sim.nearId = null;
	sim.grounded = false;
	resolveAll();
}
function pushVisited(id) {
	const visited = useGame.getState().visited;
	return visited.includes(id) ? visited : [...visited, id];
}
function travelTo(id) {
	if (sim.transitioning) return;
	if (!getLevel(id)) return;
	sim.transitioning = true;
	sim.playing = false;
	sim.vx = 0;
	sim.vz = 0;
	useGame.getState().patch({
		fading: true,
		mode: "play",
		prompt: ""
	});
	window.setTimeout(() => {
		applyLevel(id);
		const level = getLevel(id);
		useGame.getState().patch({
			fading: false,
			mode: "play",
			levelId: id,
			banner: level.name,
			visited: pushVisited(id),
			prompt: "",
			note: null
		});
		sim.playing = true;
		sim.transitioning = false;
		audio.ensure();
		audio.setMood(id);
		saveAuto();
	}, 420);
}
function beginFresh() {
	audio.ensure();
	audio.setVolume(useGame.getState().volume);
	sim.playSeconds = 0;
	sim.transitioning = true;
	sim.playing = false;
	useGame.getState().patch({ fading: true });
	window.setTimeout(() => {
		applyLevel("medence");
		useGame.getState().patch({
			mode: "play",
			levelId: "medence",
			collected: [],
			visited: ["medence"],
			note: null,
			fading: false,
			banner: "Medence, 3:17",
			prompt: "",
			playSeconds: 0,
			toast: ""
		});
		sim.playing = true;
		sim.transitioning = false;
		audio.setMood("medence");
		lookLock();
		saveAuto();
	}, 280);
}
function beginFrom(data) {
	audio.ensure();
	const settings = data.settings;
	useGame.getState().patch({
		sensitivity: settings.sensitivity,
		volume: settings.volume,
		invertY: settings.invertY,
		invertX: settings.invertX,
		quality: settings.quality,
		collected: data.collected,
		visited: data.visited,
		playSeconds: data.playSeconds,
		levelId: data.levelId,
		note: null,
		prompt: "",
		toast: "",
		fading: true
	});
	syncSettings(settings);
	audio.setVolume(settings.volume);
	saveSettings(settings);
	sim.playSeconds = data.playSeconds;
	sim.transitioning = true;
	window.setTimeout(() => {
		applyLevel(data.levelId, data);
		useGame.getState().patch({
			mode: "play",
			fading: false,
			banner: getLevel(data.levelId).name
		});
		sim.playing = true;
		sim.transitioning = false;
		audio.setMood(data.levelId);
		lookLock();
	}, 280);
}
function continueGame() {
	const data = newestSave();
	if (!data) beginFresh();
	else beginFrom(data);
}
function pauseGame() {
	sim.playing = false;
	sim.keys.clear();
	sim.joyX = 0;
	sim.joyY = 0;
	useGame.getState().patch({
		mode: "paused",
		playSeconds: sim.playSeconds,
		prompt: ""
	});
	saveAuto();
	try {
		if (document.pointerLockElement) document.exitPointerLock();
	} catch {}
}
function resumeGame() {
	const mode = useGame.getState().mode;
	if (mode !== "paused" && mode !== "note") return;
	sim.keys.clear();
	sim.prevE = false;
	sim.prevJ = false;
	sim.playing = true;
	useGame.getState().patch({
		mode: "play",
		note: null
	});
	lookLock();
}
function backToTitle() {
	sim.playing = false;
	sim.keys.clear();
	saveAuto();
	useGame.getState().patch({
		mode: "title",
		note: null,
		prompt: "",
		fading: false
	});
	try {
		if (document.pointerLockElement) document.exitPointerLock();
	} catch {}
}
function openMemory() {
	const id = sim.nearId;
	if (!id) return;
	const mem = getLevel(useGame.getState().levelId).memories.find((item) => item.id === id);
	if (!mem) return;
	const state = useGame.getState();
	const already = state.collected.includes(mem.id);
	const collected = already ? state.collected : [...state.collected, mem.id];
	sim.playing = false;
	sim.useLock = .45;
	audio.chime();
	state.patch({
		mode: "note",
		note: mem,
		collected,
		toast: already ? "" : "Emlék megmaradt"
	});
	saveAuto();
}
function closeNote() {
	sim.useLock = .45;
	sim.prevE = true;
	sim.keys.delete("KeyE");
	sim.playing = true;
	useGame.getState().patch({
		mode: "play",
		note: null
	});
}
function manualSave(slot) {
	const ok = saveSlot(slot);
	useGame.getState().patch({
		toast: ok ? `${slot}. hely elmentve` : "A mentés nem sikerült",
		playSeconds: sim.playSeconds
	});
}
function manualLoad(slot) {
	const data = loadSlot(slot);
	if (!data) {
		useGame.getState().patch({ toast: "Ez a hely üres" });
		return;
	}
	beginFrom(data);
}
function downloadSave() {
	exportSave();
}
function importText(text) {
	const data = parseImport(text);
	if (!data) {
		useGame.getState().patch({ toast: "Ezt a fájlt nem tudom beolvasni" });
		return;
	}
	beginFrom(data);
}
async function toggleFullscreen() {
	try {
		if (document.fullscreenElement) await document.exitFullscreen();
		else await document.documentElement.requestFullscreen();
	} catch {
		useGame.getState().patch({ toast: "A teljes képernyő itt nem elérhető" });
	}
}
var primary = "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-medium text-bg disabled:opacity-40";
var ghost = "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface/80 px-5 text-fg disabled:opacity-40";
function useTouchUI() {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(pointer: coarse)");
		const check = () => setOn(mq.matches || window.innerWidth < 820);
		check();
		mq.addEventListener("change", check);
		window.addEventListener("resize", check);
		return () => {
			mq.removeEventListener("change", check);
			window.removeEventListener("resize", check);
		};
	}, []);
	return on;
}
function TitleScreen() {
	const [levelsOpen, setLevelsOpen] = (0, import_react.useState)(false);
	const [canContinue, setCanContinue] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setCanContinue(hasAnySave()), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-bg via-bg/80 to-bg/15 p-5 md:justify-center md:bg-gradient-to-r md:p-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-xl md:mx-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-xs tracking-widest text-accent",
					children: "DREAMCORE SÉTA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl leading-none text-fg md:text-7xl",
					children: "Rózsaszín óra"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base leading-relaxed text-muted",
					children: "Hat hely volt. Most a víz tovább tart. A padló tükröz, az emlék megmarad."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: primary,
							onClick: beginFresh,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5" }), "Belépés"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ghost,
							disabled: !canContinue,
							onClick: continueGame,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" }), "Folytatás"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ghost,
							onClick: () => setLevelsOpen((v) => !v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, { className: "h-5 w-5" }), "Pályák"]
						})
					]
				}),
				levelsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid max-h-64 gap-2 overflow-y-auto",
					children: LEVEL_LIST.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "min-h-12 rounded-2xl border border-border bg-surface/80 px-4 py-3 text-left",
						onClick: () => travelTo(level.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-3 font-display text-accent",
							children: level.index
						}), level.name]
					}, level.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted",
					children: "WASD séta · egér nézelődés · Shift futás · E emlék · Esc menü"
				})
			]
		})
	});
}
function Hud() {
	const levelId = useGame((s) => s.levelId);
	const collected = useGame((s) => s.collected);
	const prompt = useGame((s) => s.prompt);
	const quality = useGame((s) => s.quality);
	const volume = useGame((s) => s.volume);
	const banner = useGame((s) => s.banner);
	const level = LEVEL_LIST.find((item) => item.id === levelId) ?? LEVEL_LIST[0];
	const here = collected.filter((id) => id.startsWith(level.id)).length;
	const total = LEVEL_LIST.reduce((n, item) => n + item.memories.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-2xl text-fg",
						children: level.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							level.index,
							" / ",
							String(LEVEL_LIST.length).padStart(2, "0"),
							" · itt ",
							here,
							"/3 · összesen ",
							collected.length,
							"/",
							total,
							quality === "max" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-accent",
								children: "RAY MAX"
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 text-fg",
						"aria-label": volume > .01 ? "Némítás" : "Hang",
						onClick: () => {
							const next = volume > .01 ? 0 : .65;
							useGame.getState().patch({ volume: next });
							audio.ensure();
							audio.setVolume(next);
							saveSettings({ volume: next });
						},
						children: volume > .01 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 text-fg",
						"aria-label": "Menü",
						onClick: pauseGame,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})]
				})]
			}),
			banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "banner-in absolute left-1/2 top-24 -translate-x-1/2 text-center font-display text-3xl text-fg",
				children: banner
			}, banner) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" }),
			prompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "prompt-in absolute bottom-36 left-0 right-0 text-center text-sm text-fg md:bottom-16",
				children: prompt
			}, prompt) : null
		]
	});
}
function SlotRow({ label, data, onSave, onLoad, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-bg/60 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-fg",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: data ? formatWhen(data.updatedAt) : "üres"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: data ? `${levelName(data.levelId)} · ${data.collected.length} emlék · ${formatPlay(data.playSeconds)}` : "Még nincs itt semmi."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [onSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghost,
					onClick: onSave,
					children: "Mentés ide"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: ghost,
					disabled: !data || !onLoad,
					onClick: onLoad,
					children: "Betöltés"
				})]
			}),
			onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `${ghost} mt-2`,
				disabled: !data,
				onClick: onDelete,
				children: "Törlés"
			}) : null
		]
	});
}
function PauseLayer() {
	const [tab, setTab] = (0, import_react.useState)("main");
	const [rev, setRev] = (0, import_react.useState)(0);
	const fileRef = (0, import_react.useRef)(null);
	const sensitivity = useGame((s) => s.sensitivity);
	const volume = useGame((s) => s.volume);
	const invertY = useGame((s) => s.invertY);
	const invertX = useGame((s) => s.invertX);
	const quality = useGame((s) => s.quality);
	const collected = useGame((s) => s.collected);
	const refresh = () => setRev((n) => n + 1);
	const auto = rev >= 0 ? loadAuto() : null;
	const setQuality = (next) => {
		useGame.getState().patch({ quality: next });
		saveSettings({
			quality: next,
			explicitQuality: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-end justify-center bg-bg/55 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-full w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface p-5 text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: tab === "main" ? "Szünet" : tab === "save" ? "Mentés" : tab === "levels" ? "Pályák" : "Beállítás"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid h-11 w-11 place-items-center rounded-full text-muted",
						"aria-label": "Bezár",
						onClick: resumeGame,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				tab === "main" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: primary,
							onClick: resumeGame,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5" }), "Folytatás"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ghost,
							onClick: () => setTab("save"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-5 w-5" }), "Mentések"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ghost,
							onClick: () => setTab("levels"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, { className: "h-5 w-5" }), "Pályaválasztó"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ghost,
							onClick: () => setTab("settings"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" }), "Beállítások"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: ghost,
							onClick: backToTitle,
							children: "Főmenü"
						})
					]
				}),
				tab === "save" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotRow, {
							label: "Automatikus",
							data: auto,
							onLoad: auto ? () => beginFrom(auto) : void 0
						}),
						[
							1,
							2,
							3
						].map((n) => {
							const data = loadSlot(n);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotRow, {
								label: `${n}. hely`,
								data,
								onSave: () => {
									manualSave(n);
									refresh();
								},
								onLoad: () => manualLoad(n),
								onDelete: () => {
									deleteSlot(n);
									refresh();
								}
							}, n);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: ghost,
									onClick: downloadSave,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-5 w-5" }), "Fájlba"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: ghost,
									onClick: () => fileRef.current?.click(),
									children: "Beolvasás"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "application/json,.json",
									className: "hidden",
									onChange: (e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										file.text().then(importText);
										e.target.value = "";
									}
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: ghost,
							onClick: () => setTab("main"),
							children: "Vissza"
						})
					]
				}),
				tab === "levels" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [LEVEL_LIST.map((level) => {
						const got = collected.filter((id) => id.startsWith(level.id)).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-h-12 items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-3 text-left",
							onClick: () => travelTo(level.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-3 font-display text-accent",
								children: level.index
							}), level.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: [got, "/3"]
							})]
						}, level.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: ghost,
						onClick: () => setTab("main"),
						children: "Vissza"
					})]
				}),
				tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm text-muted",
							children: ["Egérérzékenység", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: .4,
								max: 2.2,
								step: .05,
								value: sensitivity,
								onChange: (e) => {
									const sensitivityNext = Number(e.target.value);
									useGame.getState().patch({ sensitivity: sensitivityNext });
									syncSettings({
										sensitivity: sensitivityNext,
										invertY,
										invertX
									});
									saveSettings({ sensitivity: sensitivityNext });
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm text-muted",
							children: ["Hangerő", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: volume,
								onChange: (e) => {
									const volumeNext = Number(e.target.value);
									useGame.getState().patch({ volume: volumeNext });
									audio.ensure();
									audio.setVolume(volumeNext);
									saveSettings({ volume: volumeNext });
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ghost,
								onClick: () => {
									const next = !invertX;
									useGame.getState().patch({ invertX: next });
									syncSettings({
										sensitivity,
										invertY,
										invertX: next
									});
									saveSettings({ invertX: next });
								},
								children: ["X tengely ", invertX ? "fordított" : "normál"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ghost,
								onClick: () => {
									const next = !invertY;
									useGame.getState().patch({ invertY: next });
									syncSettings({
										sensitivity,
										invertY: next,
										invertX
									});
									saveSettings({ invertY: next });
								},
								children: ["Y tengely ", invertY ? "fordított" : "normál"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								["low", "Alacsony"],
								["high", "Közepes"],
								["max", "Ray MAX"]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: id === quality ? primary : ghost,
								onClick: () => setQuality(id),
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: "Ray MAX: a padló élőben visszatükrözi a teret, a fémek a fényt, bloom és éles árnyék. Gyenge gépen a középső nyugodtabb."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ghost,
							onClick: () => void toggleFullscreen(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "h-5 w-5" }), "Teljes képernyő"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: ghost,
							onClick: () => setTab("main"),
							children: "Vissza"
						})
					]
				})
			]
		})
	});
}
function NoteCard() {
	const note = useGame((s) => s.note);
	if (!note) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "note-in absolute inset-0 z-30 grid place-items-center bg-bg/45 p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "note-card can-select w-full max-w-md rounded-2xl border border-border bg-fg p-6 text-bg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-surface",
					children: "EMLÉK"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-display text-4xl",
					children: note.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg leading-relaxed",
					children: note.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-6 inline-flex h-12 items-center justify-center rounded-full bg-bg px-5 text-fg",
					onClick: closeNote,
					children: "Vissza a sétához"
				})
			]
		}, note.id)
	});
}
function Toast() {
	const toast = useGame((s) => s.toast);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "toast-in absolute left-1/2 top-6 z-40 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg",
		children: toast
	});
}
function Fade() {
	const fading = useGame((s) => s.fading);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute inset-0 z-40 bg-bg transition-opacity duration-300 ${fading ? "opacity-100" : "opacity-0"}` });
}
function HoldButton({ label, pressed, on }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `h-14 min-w-16 rounded-full border border-border px-4 text-sm ${pressed ? "bg-primary text-bg" : "bg-surface/80 text-fg"}`,
		onPointerDown: (e) => {
			e.preventDefault();
			on(true);
		},
		onPointerUp: () => on(false),
		onPointerCancel: () => on(false),
		children: label
	});
}
function TouchControls() {
	const on = useTouchUI();
	const mode = useGame((s) => s.mode);
	const [stick, setStick] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [sprint, setSprint] = (0, import_react.useState)(false);
	const stickId = (0, import_react.useRef)(-1);
	const lookId = (0, import_react.useRef)(-1);
	const origin = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const lookAt = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	if (!on || mode !== "play") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "safe-bottom absolute bottom-4 left-4 z-30 grid h-36 w-36 place-items-center rounded-full border border-border bg-surface/50",
			onPointerDown: (e) => {
				stickId.current = e.pointerId;
				origin.current = {
					x: e.clientX,
					y: e.clientY
				};
				e.currentTarget.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				if (e.pointerId !== stickId.current) return;
				let dx = e.clientX - origin.current.x;
				let dy = e.clientY - origin.current.y;
				const mag = Math.hypot(dx, dy);
				const max = 48;
				if (mag > max) {
					dx = dx / mag * max;
					dy = dy / mag * max;
				}
				setStick({
					x: dx,
					y: dy
				});
				sim.joyX = dx / max;
				sim.joyY = -dy / max;
			},
			onPointerUp: (e) => {
				if (e.pointerId !== stickId.current) return;
				stickId.current = -1;
				setStick({
					x: 0,
					y: 0
				});
				sim.joyX = 0;
				sim.joyY = 0;
			},
			onPointerCancel: (e) => {
				if (e.pointerId !== stickId.current) return;
				stickId.current = -1;
				setStick({
					x: 0,
					y: 0
				});
				sim.joyX = 0;
				sim.joyY = 0;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-12 w-12 rounded-full bg-primary",
				style: { transform: `translate(${stick.x}px, ${stick.y}px)` }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-0 right-0 top-0 z-20 w-[58%]",
			onPointerDown: (e) => {
				if (e.target.closest("button")) return;
				lookId.current = e.pointerId;
				lookAt.current = {
					x: e.clientX,
					y: e.clientY
				};
				e.currentTarget.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				if (e.pointerId !== lookId.current) return;
				const dx = e.clientX - lookAt.current.x;
				const dy = e.clientY - lookAt.current.y;
				lookAt.current = {
					x: e.clientX,
					y: e.clientY
				};
				const xSign = sim.invertX ? -1 : 1;
				const ySign = sim.invertY ? -1 : 1;
				sim.yaw -= dx * sim.sens * 1.8 * xSign;
				sim.pitch = Math.max(-1.15, Math.min(1.15, sim.pitch - dy * sim.sens * 1.8 * ySign));
			},
			onPointerUp: (e) => {
				if (e.pointerId === lookId.current) lookId.current = -1;
			},
			onPointerCancel: (e) => {
				if (e.pointerId === lookId.current) lookId.current = -1;
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "safe-bottom absolute bottom-4 right-4 z-30 flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, {
					label: "Ugrás",
					on: (down) => sim.jumpHeld = down
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, {
					label: "Futás",
					pressed: sprint,
					on: (down) => {
						if (!down) return;
						const next = !sim.sprintToggle;
						sim.sprintToggle = next;
						setSprint(next);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, {
					label: "Emlék",
					on: (down) => sim.interactHeld = down
				})
			]
		})
	] });
}
var SIZE = 512;
function hash(ix, iy) {
	let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263);
	n = Math.imul(n ^ n >>> 13, 1274126177);
	return ((n ^ n >>> 16) >>> 0) / 4294967295;
}
function vnoise(x, y) {
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const fx = x - x0;
	const fy = y - y0;
	const ux = fx * fx * (3 - 2 * fx);
	const uy = fy * fy * (3 - 2 * fy);
	const a = hash(x0, y0);
	const b = hash(x0 + 1, y0);
	const c = hash(x0, y0 + 1);
	const d = hash(x0 + 1, y0 + 1);
	return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
function fbm(x, y) {
	let v = 0;
	let a = .55;
	let f = 1;
	for (let i = 0; i < 4; i++) {
		v += a * vnoise(x * f, y * f);
		f *= 2.05;
		a *= .5;
	}
	return v;
}
function canvasTex(draw, colorSpace) {
	const canvas = document.createElement("canvas");
	canvas.width = SIZE;
	canvas.height = SIZE;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("canvas");
	const img = ctx.createImageData(SIZE, SIZE);
	draw(img, SIZE);
	ctx.putImageData(img, 0, 0);
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = colorSpace;
	tex.wrapS = RepeatWrapping;
	tex.wrapT = RepeatWrapping;
	tex.anisotropy = 8;
	tex.needsUpdate = true;
	return tex;
}
function build(kind) {
	const height = new Float32Array(SIZE * SIZE);
	return {
		map: canvasTex((img, size) => {
			const d = img.data;
			for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
				const i = y * size + x;
				const u = x / size;
				const v = y / size;
				let shade = .92;
				let h = .5;
				if (kind === "tile") {
					const ts = 128;
					const gx = x % ts;
					const gy = y % ts;
					const grout = gx < 7 || gy < 7 || gx > 122 || gy > 122;
					const tileN = hash(Math.floor(x / ts), Math.floor(y / ts));
					const edge = Math.min(gx, gy, ts - gx, ts - gy) / 10;
					shade = grout ? .28 : .72 + tileN * .26 + Math.min(edge, 1) * .12;
					shade *= .9 + fbm(u * 8, v * 8) * .16;
					shade += (hash(x >> 1, y >> 1) - .5) * .08;
					grout || .28 + tileN * .08;
					h = grout ? .15 : .72 + Math.min(edge, 1) * .2;
				} else if (kind === "wood") {
					const plank = 72;
					const py = y % plank;
					const seam = py < 3 || py > 69;
					const grain = .5 + .5 * Math.sin((x * .35 + fbm(u * 2, v * 8) * 18) * .7);
					const knot = vnoise(u * 3 + Math.floor(y / plank), v * 2);
					shade = seam ? .35 : .62 + grain * .28 + (knot > .82 ? -.18 : 0);
					h = seam ? .2 : .55 + grain * .25;
				} else if (kind === "carpet") {
					const n = fbm(u * 28, v * 22);
					const fiber = .5 + .5 * Math.sin(x * 1.7 + n * 6);
					shade = .62 + n * .28 + fiber * .08;
					h = n;
				} else if (kind === "asphalt") {
					const n = fbm(u * 18, v * 18);
					const crack = Math.abs(Math.sin(u * 9 + fbm(u * 3, v * 3) * 4)) < .04 ? .25 : 1;
					shade = (.45 + n * .4) * crack;
					h = n * crack;
				} else if (kind === "metal") {
					const brush = .5 + .5 * Math.sin(y * .9 + fbm(u * 4, v * 20) * 5);
					const scratch = Math.abs(Math.sin(u * 40 + v * 2)) > .985 ? .7 : 1;
					shade = (.72 + brush * .22) * scratch;
					scratch < 1 || .35 + (1 - brush) * .15;
					h = brush * .35 * scratch;
				} else if (kind === "grass") {
					const n = fbm(u * 16, v * 10);
					const blade = .5 + .5 * Math.sin(x * 2.2 + n * 8);
					shade = .55 + n * .3 + blade * .12;
					h = blade * .7 + n * .3;
				} else if (kind === "water") {
					const n = fbm(u * 7, v * 5);
					const rip = .5 + .5 * Math.sin(u * 22 + n * 9) * Math.sin(v * 18 + n * 6);
					const caustic = Math.pow(Math.abs(Math.sin(u * 30 + n * 12) * Math.sin(v * 26 + n * 8)), 5);
					shade = .55 + n * .3 + rip * .12 + caustic * .4;
					.16 + (1 - caustic) * .12;
					h = n * .7 + rip * .4 + caustic * .25;
				} else if (kind === "glow") {
					shade = .9 + fbm(u * 4, v * 4) * .08;
					h = .5;
				} else if (kind === "plaster") {
					const n = fbm(u * 9, v * 9);
					const pit = hash(x >> 2, y >> 2);
					const stain = vnoise(u * 2.2, v * 2.2) > .78 ? .78 : 1;
					shade = (.7 + n * .26 + (pit - .5) * .08) * stain;
					h = n * .55;
				} else {
					const n = fbm(u * 10, v * 10);
					shade = .8 + n * .16;
					h = n * .4;
				}
				height[i] = h;
				const o = i * 4;
				const g = Math.max(0, Math.min(255, shade * 255));
				d[o] = g;
				d[o + 1] = g;
				d[o + 2] = g;
				d[o + 3] = 255;
			}
		}, SRGBColorSpace),
		roughnessMap: canvasTex((img, size) => {
			const d = img.data;
			for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
				const i = y * size + x;
				const u = x / size;
				const v = y / size;
				let rough = .85;
				if (kind === "tile") {
					const ts = 128;
					const gx = x % ts;
					const gy = y % ts;
					rough = gx < 7 || gy < 7 || gx > 122 || gy > 122 ? 1 : .32;
				} else if (kind === "wood") rough = y % 72 < 3 ? .95 : .62;
				else if (kind === "metal") rough = .42;
				else if (kind === "water") rough = .2 + fbm(u * 5, v * 4) * .15;
				else if (kind === "glow") rough = .35;
				else if (kind === "carpet" || kind === "grass" || kind === "plaster" || kind === "asphalt") rough = .95;
				else rough = .7;
				const g = Math.max(0, Math.min(255, rough * 255));
				const o = i * 4;
				d[o] = g;
				d[o + 1] = g;
				d[o + 2] = g;
				d[o + 3] = 255;
			}
		}, ""),
		normalMap: canvasTex((img, size) => {
			const d = img.data;
			const strength = kind === "tile" ? 2.4 : kind === "asphalt" || kind === "grass" ? 2.1 : kind === "water" ? 1.6 : kind === "metal" || kind === "glow" ? .7 : 1.3;
			for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
				const hl = height[y * size + (x - 1 + size) % size];
				const hr = height[y * size + (x + 1) % size];
				const hd = height[(y + 1) % size * size + x];
				const hu = height[(y - 1 + size) % size * size + x];
				const nx = (hl - hr) * strength;
				const ny = (hd - hu) * strength;
				const nz = 1;
				const len = Math.hypot(nx, ny, nz) || 1;
				const o = (y * size + x) * 4;
				d[o] = (nx / len * .5 + .5) * 255;
				d[o + 1] = (ny / len * .5 + .5) * 255;
				d[o + 2] = (nz / len * .5 + .5) * 255;
				d[o + 3] = 255;
			}
		}, "")
	};
}
var cache = /* @__PURE__ */ new Map();
function surfaceTextures(kind) {
	let set = cache.get(kind);
	if (!set) {
		set = build(kind);
		cache.set(kind, set);
	}
	return set;
}
function classifySurface(p) {
	if ((p.ei ?? 0) > .85 && (p.m ?? 0) < .4) return "glow";
	if ((p.trans ?? 0) > .45) return "water";
	if ((p.m ?? 0) >= .4 && (p.rg ?? 1) < .55) return "metal";
	const col = new Color(p.c);
	const hsl = {
		h: 0,
		s: 0,
		l: 0
	};
	col.getHSL(hsl);
	if (hsl.l < .2 && hsl.s < .35) return "asphalt";
	if (hsl.h > .22 && hsl.h < .46 && hsl.s > .18 && hsl.l > .18 && hsl.l < .62) return "wood";
	if (hsl.h > .22 && hsl.h < .48 && hsl.s > .12 && (p.t === "sphere" || (p.rg ?? 0) > .82)) return "grass";
	if ((p.rg ?? 1) < .22) return "tile";
	if ((p.rg ?? 0) > .72 && hsl.l > .72) return "plaster";
	if (hsl.s > .25 && hsl.l < .58 && (p.rg ?? 0) > .48) return "carpet";
	return "paint";
}
function floorSurface(levelId) {
	if (levelId === "medence" || levelId === "folyoso") return "tile";
	if (levelId === "poolrooms") return "water";
	if (levelId === "jatszo") return "grass";
	if (levelId === "szoba") return "carpet";
	return "asphalt";
}
function repeatScale(kind) {
	if (kind === "tile") return .7;
	if (kind === "wood") return .5;
	if (kind === "asphalt") return 2.4;
	if (kind === "carpet") return .85;
	if (kind === "grass") return 1.15;
	if (kind === "metal") return .4;
	if (kind === "water") return 1.5;
	return 1.05;
}
function normalScaleFor(kind) {
	if (kind === "tile") return .9;
	if (kind === "asphalt" || kind === "grass") return 1.05;
	if (kind === "water") return .45;
	if (kind === "metal" || kind === "glow") return .22;
	if (kind === "carpet") return .7;
	if (kind === "wood") return .55;
	if (kind === "plaster") return .38;
	return .28;
}
function envIntensityFor(kind) {
	if (kind === "metal") return 1.8;
	if (kind === "water") return 1.25;
	if (kind === "tile") return .9;
	if (kind === "asphalt") return .65;
	return .42;
}
var CHROMA = new Vector2(65e-5, .00105);
var CHROMA_SOFT = new Vector2(2e-4, 3e-4);
var SKY_VERT = `
  varying vec3 vP;
  void main() {
    vP = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
var SKY_FRAG = `
  varying vec3 vP;
  uniform vec3 zenith;
  uniform vec3 horizon;
  uniform vec3 ground;
  void main() {
    vec3 d = normalize(vP);
    float h = d.y;
    vec3 col = mix(ground, horizon, smoothstep(-0.4, 0.05, h));
    col = mix(col, zenith, smoothstep(0.0, 0.72, h));
    gl_FragColor = vec4(col, 1.0);
  }
`;
function reducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Sky({ level }) {
	const uniforms = (0, import_react.useMemo)(() => ({
		zenith: { value: new Color(level.sky.zenith) },
		horizon: { value: new Color(level.sky.horizon) },
		ground: { value: new Color(level.sky.ground) }
	}), [
		level.sky.zenith,
		level.sky.horizon,
		level.sky.ground
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		frustumCulled: false,
		renderOrder: -1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			170,
			24,
			16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			side: 1,
			depthWrite: false,
			vertexShader: SKY_VERT,
			fragmentShader: SKY_FRAG,
			uniforms
		})]
	});
}
function Exposure({ value }) {
	const gl = useThree((s) => s.gl);
	(0, import_react.useEffect)(() => {
		gl.toneMappingExposure = value;
	}, [gl, value]);
	return null;
}
function Rig() {
	const cam = useThree((s) => s.camera);
	useFrame((state, dt) => {
		const step = Math.min(dt, .1);
		frame(step);
		const mode = useGame.getState().mode;
		const level = getLevel(useGame.getState().levelId);
		if (mode === "title") {
			const t = reducedMotion() ? .8 : state.clock.elapsedTime;
			if (level.id === "folyoso") {
				const z = 9 + Math.sin(t * .16) * 2.4;
				cam.position.set(.15, 1.55, z);
				cam.lookAt(0, 1.25, z + 7);
			} else if (level.id === "szoba") {
				const z = 2.4 + Math.sin(t * .14) * .45;
				cam.position.set(.35, 1.52, z);
				cam.lookAt(-1.3, 1.15, -1.2);
			} else if (level.id === "poolrooms") {
				const z = 4 + Math.sin(t * .1) * 2.2;
				cam.position.set(.35, 1.35, z);
				cam.lookAt(0, .35, z - 7);
			} else {
				const [ox, oz] = level.orbit;
				cam.position.set(ox + Math.sin(t * .12) * level.orbitR, level.orbitY, oz + Math.cos(t * .1) * level.orbitR * .72);
				cam.lookAt(ox, 1.1, oz - .2);
			}
			return;
		}
		const bob = reducedMotion() ? 0 : Math.sin(sim.bob) * Math.min(sim.speed, 4.2) * .011;
		const eye = sim.y + 1.48 + bob;
		cam.position.set(sim.x, eye, sim.z);
		const cp = Math.cos(sim.pitch);
		cam.lookAt(sim.x - Math.sin(sim.yaw) * cp, eye + Math.sin(sim.pitch), sim.z - Math.cos(sim.yaw) * cp);
		const target = sim.speed > 5.15 ? 75 : 68;
		if (Math.abs(cam.fov - target) > .04) {
			cam.fov += (target - cam.fov) * (1 - Math.exp(-5 * step));
			cam.updateProjectionMatrix();
		}
	});
	return null;
}
function Look() {
	const gl = useThree((s) => s.gl);
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
			if (document.pointerLockElement == null || !sim.playing) return;
			const xSign = sim.invertX ? -1 : 1;
			const ySign = sim.invertY ? -1 : 1;
			sim.yaw -= e.movementX * sim.sens * xSign;
			sim.pitch = Math.max(-1.15, Math.min(1.15, sim.pitch - e.movementY * sim.sens * ySign));
		};
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const onClick = () => {
			if (useGame.getState().mode !== "play") return;
			if (document.pointerLockElement !== el) el.requestPointerLock();
		};
		el.addEventListener("click", onClick);
		return () => el.removeEventListener("click", onClick);
	}, [gl]);
	return null;
}
function useSignTexture(text, color) {
	const tex = (0, import_react.useMemo)(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 512;
		canvas.height = 256;
		const g = canvas.getContext("2d");
		if (!g) return null;
		g.fillStyle = "#160f13";
		g.fillRect(0, 0, 512, 256);
		g.font = `700 ${text.length > 16 ? 40 : text.length > 9 ? 58 : 92}px Georgia, "Liberation Serif", serif`;
		g.fillStyle = color;
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(text, 256, 128);
		const texture = new CanvasTexture(canvas);
		texture.colorSpace = SRGBColorSpace;
		texture.needsUpdate = true;
		return texture;
	}, [text, color]);
	(0, import_react.useEffect)(() => () => tex?.dispose(), [tex]);
	return tex;
}
function SignMesh({ p }) {
	const tex = useSignTexture(p.sign ?? "", p.c);
	if (!tex) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p.p,
		rotation: p.r ?? [
			0,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [p.s[0], p.s[1]] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			map: tex,
			toneMapped: false,
			side: 2
		})]
	});
}
function useRepeatedMaps(kind, rx, ry) {
	const base = (0, import_react.useMemo)(() => surfaceTextures(kind), [kind]);
	const maps = (0, import_react.useMemo)(() => {
		const tune = (tex) => {
			const copy = tex.clone();
			copy.wrapS = RepeatWrapping;
			copy.wrapT = RepeatWrapping;
			copy.repeat.set(Math.max(.35, rx), Math.max(.35, ry));
			copy.anisotropy = 8;
			copy.needsUpdate = true;
			return copy;
		};
		return {
			map: tune(base.map),
			roughnessMap: tune(base.roughnessMap),
			normalMap: tune(base.normalMap)
		};
	}, [
		base,
		rx,
		ry
	]);
	(0, import_react.useEffect)(() => () => {
		maps.map.dispose();
		maps.roughnessMap.dispose();
		maps.normalMap.dispose();
	}, [maps]);
	return maps;
}
function SolidMesh({ p, shadows }) {
	const rot = p.r ?? [
		0,
		0,
		0
	];
	const cast = shadows && p.cast !== false && p.solid !== false;
	const kind = classifySurface(p);
	const unit = repeatScale(kind);
	const maps = useRepeatedMaps(kind, Math.max(p.s[0], p.t === "cyl" || p.t === "sphere" ? p.s[0] * 2 : .4) / unit, Math.max(p.s[1], .4) / unit);
	const normalScale = (0, import_react.useMemo)(() => {
		const n = normalScaleFor(kind);
		return new Vector2(n, n);
	}, [kind]);
	useFrame((_, dt) => {
		if (kind !== "water") return;
		maps.normalMap.offset.x += dt * .025;
		maps.normalMap.offset.y += dt * .018;
	});
	const geo = (() => {
		if (p.t === "cyl") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			p.s[0],
			p.s[0],
			p.s[1],
			20
		] });
		if (p.t === "sphere") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			p.s[0],
			24,
			16
		] });
		if (p.t === "plane") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [p.s[0], p.s[1]] });
		if (p.t === "torus") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			p.s[0],
			p.s[1],
			12,
			24
		] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			p.s[0],
			p.s[1],
			p.s[2]
		] });
	})();
	const common = {
		color: p.c,
		map: maps.map,
		roughnessMap: maps.roughnessMap,
		normalMap: maps.normalMap,
		normalScale,
		roughness: p.rg ?? (p.trans != null ? .06 : .6),
		metalness: p.m ?? (p.trans != null ? .04 : .05),
		envMapIntensity: envIntensityFor(kind),
		emissive: p.e ?? "#000000",
		emissiveIntensity: p.ei ?? 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p.p,
		rotation: rot,
		castShadow: cast,
		receiveShadow: shadows,
		children: [geo, p.trans != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			...common,
			transmission: p.trans,
			thickness: .6,
			ior: 1.33,
			transparent: true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...common })]
	});
}
function PropView({ p, shadows }) {
	if (p.sign) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignMesh, { p });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolidMesh, {
		p,
		shadows
	});
}
function Floor({ level, quality }) {
	const f = level.floor;
	const kind = floorSurface(level.id);
	const unit = repeatScale(kind);
	const maps = useRepeatedMaps(kind, f.w / unit, f.d / unit);
	const normalScale = (0, import_react.useMemo)(() => {
		const n = normalScaleFor(kind) * (f.mirror > .7 ? .65 : 1);
		return new Vector2(n, n);
	}, [kind, f.mirror]);
	const calm = level.id === "poolrooms";
	const wet = f.mirror >= .7;
	const blur = calm ? [4, 2] : quality === "max" ? wet ? [16, 8] : [70, 32] : wet ? [36, 18] : [110, 50];
	useFrame((_, dt) => {
		if (kind !== "water" || reducedMotion()) return;
		maps.normalMap.offset.y += dt * .012;
		maps.normalMap.offset.x += dt * .008;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position: [
			f.cx,
			f.y,
			f.cz
		],
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [f.w, f.d] }), quality === "low" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: f.color,
			map: maps.map,
			roughnessMap: maps.roughnessMap,
			normalMap: maps.normalMap,
			normalScale,
			roughness: calm ? .12 : .55,
			metalness: calm ? .55 : .18
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshReflectorMaterial, {
			resolution: quality === "max" ? calm ? 1024 : 1024 : 640,
			blur,
			mixBlur: calm ? .12 : wet ? .35 : .85,
			mixStrength: calm ? Math.max(f.strength, 1.45) : f.strength,
			mirror: calm ? .98 : Math.min(.96, f.mirror + (wet ? .08 : 0)),
			roughness: calm ? .06 : f.roughness,
			metalness: calm ? .78 : Math.max(f.metalness, wet ? .62 : .35),
			color: f.color,
			map: maps.map,
			roughnessMap: maps.roughnessMap,
			normalMap: maps.normalMap,
			normalScale,
			envMapIntensity: calm ? 1.35 : wet ? 1.15 : .7,
			distortion: calm ? .035 : f.distortion,
			depthScale: 0,
			minDepthThreshold: .2,
			maxDepthThreshold: 1.3,
			reflectorOffset: .03
		})]
	});
}
function MemoryOrb({ position, got }) {
	const ref = (0, import_react.useRef)(null);
	const glow = (0, import_react.useMemo)(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		const g = canvas.getContext("2d");
		if (!g) return null;
		const rad = g.createRadialGradient(128, 118, 8, 128, 128, 126);
		rad.addColorStop(0, "#ffffff");
		rad.addColorStop(.35, "#f4fbff");
		rad.addColorStop(.7, "#d5e7f2");
		rad.addColorStop(1, "#9eb4c4");
		g.fillStyle = rad;
		g.fillRect(0, 0, 256, 256);
		g.globalAlpha = .35;
		for (let i = 0; i < 18; i++) {
			g.strokeStyle = i % 2 ? "#ffffff" : "#e7f4ff";
			g.lineWidth = 1 + i % 3;
			g.beginPath();
			g.arc(128, 128, 18 + i * 6, i * .4, i * .4 + 1.4);
			g.stroke();
		}
		const tex = new CanvasTexture(canvas);
		tex.colorSpace = SRGBColorSpace;
		tex.needsUpdate = true;
		return tex;
	}, []);
	(0, import_react.useEffect)(() => () => glow?.dispose(), [glow]);
	useFrame((state) => {
		if (!ref.current) return;
		const t = state.clock.elapsedTime;
		ref.current.position.y = position[1] + Math.sin(t * 1.4 + position[0]) * .12;
		ref.current.rotation.y = t * .45;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [got ? .16 : .22, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#f7fbff",
				map: glow,
				emissive: "#ffffff",
				emissiveIntensity: got ? .35 : 1.7,
				roughness: .12,
				metalness: .04,
				transmission: .62,
				thickness: .45,
				transparent: true,
				envMapIntensity: 1.4
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				got ? .3 : .38,
				20,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: glow,
				color: "#ffffff",
				transparent: true,
				opacity: got ? .18 : .42,
				depthWrite: false,
				toneMapped: false
			})] }),
			got ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: "#f4fbff",
				intensity: 1.6,
				distance: 3.4,
				decay: 2
			})
		]
	});
}
function Memories({ level }) {
	const collected = useGame((s) => s.collected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: level.memories.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryOrb, {
		position: m.p,
		got: collected.includes(m.id)
	}, m.id)) });
}
function PortalMark({ level }) {
	const ref = (0, import_react.useRef)(null);
	useFrame((state) => {
		if (!ref.current || reducedMotion()) return;
		ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * .04;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: [
			level.portal.x,
			0,
			level.portal.z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.62,
					1.15,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.1,
					2.3,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ff7aa2",
					emissive: "#ff7aa2",
					emissiveIntensity: 1.1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.62,
					1.15,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.1,
					2.3,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ff7aa2",
					emissive: "#ff7aa2",
					emissiveIntensity: 1.1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.32,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.34,
					.1,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f0c36a",
					emissive: "#f0c36a",
					emissiveIntensity: .7
				})]
			})
		]
	});
}
function Swing() {
	const ref = (0, import_react.useRef)(null);
	useFrame((state) => {
		if (!ref.current || reducedMotion()) return;
		ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .65) * .32;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		position: [
			0,
			2.5,
			-6
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.85,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.85,
				.06,
				.32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f0c36a",
				roughness: .45
			})]
		})
	});
}
function Carousel() {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		if (!ref.current || reducedMotion()) return;
		ref.current.rotation.y += dt * .35;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: [
			0,
			.2,
			-6.2
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			1.45,
			1.45,
			.12,
			20
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#f0c36a",
			metalness: .35,
			roughness: .38
		})] }), [
			0,
			1,
			2,
			3
		].map((i) => {
			const a = i / 4 * Math.PI * 2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					Math.cos(a) * 1.05,
					.4,
					Math.sin(a) * 1.05
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.7,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#e24b4b" })]
			}, i);
		})]
	});
}
function Dust({ color }) {
	const geo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const arr = /* @__PURE__ */ new Float32Array(192);
		for (let i = 0; i < 64; i++) {
			arr[i * 3] = (Math.random() - .5) * 16;
			arr[i * 3 + 1] = Math.random() * 3.2 + .15;
			arr[i * 3 + 2] = (Math.random() - .5) * 16;
		}
		g.setAttribute("position", new BufferAttribute(arr, 3));
		return g;
	}, []);
	const ref = (0, import_react.useRef)(null);
	const cam = useThree((s) => s.camera);
	useFrame((_, dt) => {
		if (!ref.current) return;
		ref.current.rotation.y += dt * .02;
		ref.current.position.set(cam.position.x, 0, cam.position.z);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref,
		geometry: geo,
		frustumCulled: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color,
			size: .05,
			transparent: true,
			opacity: .38,
			depthWrite: false
		})
	});
}
function FootShadow({ on }) {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		if (!ref.current) return;
		ref.current.position.set(sim.x, sim.y + .28, sim.z);
		ref.current.visible = on && sim.playing;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.22,
			10,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			colorWrite: false,
			depthWrite: false
		})]
	});
}
function RoomTwelve() {
	const screen = (0, import_react.useRef)(null);
	const hand = (0, import_react.useRef)(null);
	const drop = (0, import_react.useRef)(null);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		if (screen.current) {
			const dead = Math.random() > .93;
			screen.current.emissiveIntensity = dead ? .12 : 1.15 + Math.sin(t * 19) * .35;
		}
		if (hand.current) {
			const twitch = !reducedMotion() && Math.floor(t * .4) % 6 === 0 ? Math.sin(t * 9) * .55 : 0;
			hand.current.rotation.z = -.55 + twitch;
		}
		if (drop.current) {
			if (reducedMotion()) {
				drop.current.position.y = .62;
				return;
			}
			const cyc = t % 2.6 / 2.6;
			drop.current.position.y = 2.35 - cyc * 1.7;
			const splash = cyc > .94;
			drop.current.scale.set(splash ? 1.8 : .45, splash ? .2 : .7, splash ? 1.8 : .45);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.55,
				1.06,
				2.34
			],
			rotation: [
				0,
				Math.PI,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.92, .5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: screen,
				color: "#d7f1ff",
				emissive: "#9ad7ff",
				emissiveIntensity: 1.3,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-1.7,
				2.05,
				-4.96
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.36,
						.36,
						.05,
						24
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f6ebe6",
						roughness: .4,
						metalness: .15
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.12,
						.02,
						.04
					],
					rotation: [
						0,
						0,
						-1.15
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.025,
						.2,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2328" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					ref: hand,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.12,
							.05
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.012,
							.24,
							.012
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e24b4b",
							emissive: "#e24b4b",
							emissiveIntensity: .4
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: drop,
			position: [
				3.2,
				2.2,
				-3.5
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.035,
				8,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d7e7f2",
				roughness: .05,
				metalness: .2
			})]
		})
	] });
}
function World() {
	const levelId = useGame((s) => s.levelId);
	const quality = useGame((s) => s.quality);
	const level = getLevel(levelId);
	const shadows = quality !== "low";
	const sunSize = quality === "max" ? 2048 : 1024;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: [level.fog.color]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				level.fog.color,
				level.fog.near,
				level.fog.far
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sky, { level }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exposure, { value: level.exposure }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Look, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: level.ambient }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			level.hemi[0],
			level.hemi[1],
			level.hemi[2]
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: level.sun.position,
			intensity: level.sun.intensity,
			color: level.sun.color,
			castShadow: shadows,
			"shadow-mapSize-width": sunSize,
			"shadow-mapSize-height": sunSize,
			"shadow-camera-near": 1,
			"shadow-camera-far": 70,
			"shadow-camera-left": -28,
			"shadow-camera-right": 28,
			"shadow-camera-top": 28,
			"shadow-camera-bottom": -28,
			"shadow-bias": -35e-5,
			"shadow-normalBias": .04
		}),
		level.lights.map((light, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: light.p,
			color: light.color,
			intensity: light.intensity,
			distance: light.dist,
			decay: 2
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
			frames: 1,
			resolution: quality === "max" ? 512 : 256,
			environmentIntensity: quality === "low" ? .55 : 1.05,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
					form: "rect",
					intensity: 5.5,
					color: level.sky.horizon,
					position: [
						8,
						6,
						-6
					],
					scale: [
						14,
						6,
						1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
					form: "rect",
					intensity: 3.2,
					color: level.sun.color,
					position: [
						-8,
						4,
						6
					],
					scale: [
						8,
						5,
						1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
					form: "rect",
					intensity: 4.2,
					color: "#ff7aa2",
					position: [
						0,
						2.2,
						-9
					],
					scale: [
						12,
						2.4,
						1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
					form: "rect",
					intensity: 2.4,
					color: "#f0c36a",
					position: [
						9,
						3,
						1
					],
					scale: [
						3,
						7,
						1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
					form: "rect",
					intensity: 1.8,
					color: "#9ad7ff",
					position: [
						-7,
						2.4,
						3
					],
					scale: [
						3,
						4,
						1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
					form: "circle",
					intensity: 2.2,
					color: level.sky.zenith,
					position: [
						0,
						10,
						0
					],
					scale: [
						5,
						5,
						1
					]
				})
			]
		}, `${level.id}-${quality}`),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Floor, {
			level,
			quality
		}),
		level.props.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropView, {
			p,
			shadows
		}, `${level.id}-${i}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Memories, { level }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalMark, { level }),
		level.id === "utca" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swing, {}),
		level.id === "jatszo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carousel, {}),
		level.id === "szoba" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomTwelve, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dust, { color: level.sky.horizon }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootShadow, { on: shadows }),
		quality !== "low" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EffectComposer, {
			multisampling: 0,
			enableNormalPass: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
					luminanceThreshold: .78,
					mipmapBlur: true,
					intensity: quality === "max" ? .48 : .28,
					luminanceSmoothing: .25
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromaticAberration, {
					offset: quality === "max" ? CHROMA : CHROMA_SOFT,
					radialModulation: false,
					modulationOffset: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Noise, { opacity: quality === "max" ? .045 : .035 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {
					eskil: false,
					offset: .18,
					darkness: .55
				})
			]
		})
	] });
}
var ViewError = class extends import_react.Component {
	state = { message: null };
	static getDerivedStateFromError(error) {
		return { message: error.message || "ismeretlen hiba" };
	}
	render() {
		if (this.state.message) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center p-6 text-center text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["A kép megakadt: ", this.state.message] })
		});
		return this.props.children;
	}
};
function Game() {
	const [booted, setBooted] = (0, import_react.useState)(false);
	const mode = useGame((s) => s.mode);
	const quality = useGame((s) => s.quality);
	const banner = useGame((s) => s.banner);
	const toast = useGame((s) => s.toast);
	(0, import_react.useLayoutEffect)(() => {
		const saved = loadSettings();
		const small = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 820;
		const nextQuality = saved?.explicitQuality ? saved.quality : small ? "low" : "max";
		useGame.getState().patch({
			quality: nextQuality,
			sensitivity: saved?.sensitivity ?? 1,
			volume: saved?.volume ?? .65,
			invertY: saved?.invertY ?? false,
			invertX: saved?.invertX ?? false
		});
		syncSettings(useGame.getState());
		installProbe();
		setBooted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		sim.onUse = () => openMemory();
		sim.onPortal = (to) => travelTo(to);
		sim.onPrompt = (text) => {
			if (useGame.getState().prompt !== text) useGame.getState().patch({ prompt: text });
		};
		sim.onStep = () => audio.step();
		window.__dreamGoto = (id) => travelTo(id);
		return () => {
			sim.onUse = void 0;
			sim.onPortal = void 0;
			sim.onPrompt = void 0;
			sim.onStep = void 0;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
			if (e.code === "Escape") {
				const current = useGame.getState().mode;
				if (current === "play") pauseGame();
				else if (current === "paused") resumeGame();
				else if (current === "note") closeNote();
				return;
			}
			if (!sim.playing) return;
			if (e.code === "Space" || e.code.startsWith("Arrow")) e.preventDefault();
			sim.keys.add(e.code);
		};
		const up = (e) => {
			sim.keys.delete(e.code);
		};
		const clear = () => sim.keys.clear();
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		window.addEventListener("blur", clear);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			window.removeEventListener("blur", clear);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!banner) return;
		const id = window.setTimeout(() => {
			if (useGame.getState().banner === banner) useGame.getState().patch({ banner: "" });
		}, 3400);
		return () => window.clearTimeout(id);
	}, [banner]);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(() => {
			if (useGame.getState().toast === toast) useGame.getState().patch({ toast: "" });
		}, 2200);
		return () => window.clearTimeout(id);
	}, [toast]);
	(0, import_react.useEffect)(() => {
		const saveIfPlaying = () => {
			if (useGame.getState().mode === "title") return;
			saveAuto();
		};
		const id = window.setInterval(saveIfPlaying, 2e4);
		const onHide = () => {
			if (document.visibilityState === "hidden") saveIfPlaying();
		};
		document.addEventListener("visibilitychange", onHide);
		window.addEventListener("pagehide", onHide);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", onHide);
			window.removeEventListener("pagehide", onHide);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "game-root relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: booted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewError, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
					className: "h-full w-full",
					dpr: quality === "max" ? [1, 1.5] : quality === "high" ? [1, 1.25] : [1, 1],
					shadows: quality === "low" ? false : "soft",
					camera: {
						fov: 68,
						near: .08,
						far: 220,
						position: [
							0,
							2.2,
							8
						]
					},
					gl: {
						antialias: quality !== "max",
						alpha: false,
						powerPreference: "high-performance",
						toneMapping: 4
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {})
				}, quality) }) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vhs pointer-events-none absolute inset-0 z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette pointer-events-none absolute inset-0 z-10" }),
			mode === "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {}) : null,
			mode === "play" || mode === "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}) : null,
			mode === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchControls, {}) : null,
			mode === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseLayer, {}) : null,
			mode === "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteCard, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade, {})
		]
	});
}
function Home() {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	if (!on) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid h-dvh place-items-center bg-bg font-display text-4xl text-fg",
		children: "Rózsaszín óra"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {});
}
//#endregion
export { Home as component };
