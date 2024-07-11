// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.

// urutan untuk tag button class harus "btn TYPE bebas"
// hal ini digunakan untuk kondisional warna svg
// ada beberapa opsi untuk kondisional icon yang dirender
// OPSI 1 : dapat menyediakan asset untuk setiap icon
// atau
// OPSI 2 : mengubah atribut icon menggunakan javascript
// disini aku menggunakan opsi kedua

// pr
// handler untuk svg

const btn_option = ({ text = "Button CTA", type = "primary", size = "s" }) => {
	return {
		text,
		type,
		size,
	};
};

const button = (option) => {
	const { text, type, size } = option;
	return `
    <button class="btn ${type} ${size}">
      ${text}
    </button>
  `;
};

const button_right_icon = (icon, option) => {
	const { text, type, size } = option;
	const pathObj = pathSVG(icon);
	return `
    <button class="btn ${type} ${size}">
      ${text}
      <object type="image/svg+xml" data="${pathObj}" class="icon"></object>
    </button>
  `;
};

const button_left_icon = (icon, option) => {
	const { text, type, size } = option;
	const pathObj = pathSVG(icon);
	return `
    <button class="btn ${type} ${size}">
      <object type="image/svg+xml" data="${pathObj}" class="icon"></object>
      ${text}
    </button>
  `;
};

const button_just_icon = (icon, option) => {
	const { type, size } = option;
	const pathObj = pathSVG(icon);
	return `
    <button class="btn ${type} ${size}">
      <object type="image/svg+xml" data="${pathObj}" class="icon"></object>
    </button>
  `;
};

const pathSVG = (type) => {
	switch (type) {
		case "arrow":
			return "/img/arrow.svg";
		case "garbage":
			return "/img/garbage-bin.svg";
		default:
			break;
	}
};

const button_container = () => {
	return `
    <p>Primary</p>
    <div class="btn-container">
      ${button(btn_option({ text: "explore products" }))}
      ${button_left_icon("arrow", btn_option({ text: "explore products" }))}
      ${button_right_icon("arrow", btn_option({ text: "explore products" }))}
      ${button_just_icon("arrow", btn_option({ size: "l" }))}
    </div>
    <p>Secondary</p>
    <div class="btn-container">
      ${button(btn_option({ text: "explore products", type: "secondary" }))}
      ${button_left_icon(
			"arrow",
			btn_option({ text: "explore products", type: "secondary" })
		)}
      ${button_right_icon(
			"arrow",
			btn_option({ text: "explore products", type: "secondary" })
		)}
      ${button_just_icon("arrow", btn_option({ type: "secondary" }))}
    </div>
    <p>Destructive</p>
    <div class="btn-container">
      ${button(btn_option({ text: "remove item", type: "destructive" }))}
      ${button_left_icon(
			"garbage",
			btn_option({ text: "dremove item", type: "destructive" })
		)}
      ${button_right_icon(
			"garbage",
			btn_option({ text: "remove item", type: "destructive" })
		)}
      ${button_just_icon("garbage", btn_option({ type: "destructive" }))}
    </div>
  `;
};

const icon_style_conditional = (object_tag) => {
	object_tag.forEach((obj) => {
		obj.addEventListener("load", function () {
			const svgDoc = obj.contentDocument.documentElement; // menyeleksi svg dalam object
			if (
				obj.parentElement.classList[1] === "primary" ||
				obj.parentElement.classList[1] === "destructive"
			) {
				svgDoc.style.color = "#fff"; // Ubah warna stroke SVG jika parent memiliki class .primary
			}
		});
	});
};

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root-container");
	root.innerHTML = button_container();

	const object_tag = document.querySelectorAll("object.icon");
	icon_style_conditional(object_tag);
});
