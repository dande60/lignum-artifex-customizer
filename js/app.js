const FORM_ENDPOINT = "https://formspree.io/f/xpqoyjvz";
const PRODUCTS_PATH = "assets/data/products.json";
const ITEMS_FOR_SALE_PATH = "assets/data/items-for-sale.json";
const ITEMS_FOR_SALE_RANGE_ORDER = ["under-150", "150-300", "300-600", "600-plus"];
const MOBILE_NAV_BREAKPOINT = 760;
const FALLBACK_ITEMS_FOR_SALE = {
  "under-150": [
    {
      title: "Spice Rack",
      subtitle: "Raw Paint yourself",
      price: "$145.00",
      image: "assets/images/items-for-sale/spice-rack.webp",
      imageAlt: "Raw Paint yourself",
    },
    {
      title: "Golf Plaque",
      subtitle: "Golf Course tour Magnetic Plaque",
      price: "$115.00",
      image: "assets/images/items-for-sale/golf-tour-plack.jpg",
      imageAlt: "Golf Course tour Magnetic Plaque",
    },
  ],
  "150-300": [
    {
      title: "Dog friendly welcome",
      subtitle: "Deep carved lettering 5ft 8in",
      price: "$235.00",
      image: "assets/images/items-for-sale/dog-sign.webp",
      imageAlt: "Dog friendly welcome sign",
    },
    {
      title: "Frosty the Server",
      subtitle: "Solid Maple Serving Tray",
      price: "$205.00",
      image: "assets/images/items-for-sale/snowman-server.webp",
      imageAlt: "Frosy christmas Serving Tray",
    },
  ],
  "300-600": [],
  "600-plus": [],
};

const navToggle = document.querySelector(".site-nav-toggle");
const siteNav = document.getElementById("site-nav");
const PDF_LIBRARY_SOURCES = [
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
];
let pdfLibrariesPromise = null;

function trackAnalyticsEvent(eventName, detail = {}) {
  const payload = {
    event: eventName,
    ...detail,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  document.dispatchEvent(new CustomEvent(`analytics:${eventName}`, { detail: payload }));
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    document.head.append(script);
  });
}

async function ensurePdfLibraries() {
  if (window.jspdf?.jsPDF && typeof window.html2canvas === "function") {
    return;
  }

  if (!pdfLibrariesPromise) {
    pdfLibrariesPromise = (async () => {
      for (const src of PDF_LIBRARY_SOURCES) {
        await loadScript(src);
      }
    })().catch((error) => {
      pdfLibrariesPromise = null;
      throw error;
    });
  }

  await pdfLibrariesPromise;
}

function closeMobileNav() {
  if (!navToggle || !siteNav) return;
  navToggle.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
  siteNav.classList.remove("is-open");
}

function openMobileNav() {
  if (!navToggle || !siteNav) return;
  navToggle.classList.add("is-open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close navigation menu");
  siteNav.classList.add("is-open");
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.contains("is-open");
    if (isOpen) {
      closeMobileNav();
      return;
    }

    openMobileNav();
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= MOBILE_NAV_BREAKPOINT) {
        closeMobileNav();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT) {
      closeMobileNav();
    }
  });
}
const FALLBACK_PRODUCTS = [
  {
    id: "gift-ideas",
    name: "Gift Ideas",
    category: "Personalized Gifts",
    description:
      "A flexible inquiry for custom gift pieces, engraved keepsakes, small-batch gifts, and one-off personalized woodworking ideas.",
    detailLinkText: "Visit the gallery for more ideas:",
    detailLinkLabel: "Portfolio Gallery",
    detailLinkHref: "https://www.lignumartifex.com/gallery.html",
    active: true,
    image: "assets/images/products/jewel-box.webp",
    quoteType: "Custom review required",
    rules: [
      "Gift concepts vary widely, so this form is used to capture direction before product details are finalized.",
      "Personalization, timelines, and quantity affect feasibility and quote scope.",
      "This version gathers design intent only. Pricing and uploads remain outside the current release.",
      "Quote responses are typically sent within 48 to 72 hours.",
    ],
    options: [
      {
        id: "gift_type",
        label: "Gift Type",
        type: "select",
        required: true,
        choices: [
          { value: "engraved-keepsake", label: "Engraved keepsake" },
          { value: "plaque", label: "Plaque" },
          { value: "holiday-gift", label: "Holiday gift" },
          { value: "i-need-guidance", label: "Need Custom Gift" },
        ],
      },
      {
        id: "material_direction",
        label: "Wood Species",
        type: "select",
        required: true,
        choices: [
          {
            value: "walnut",
            label: "Walnut",
            image: "assets/images/wood-species/black-walnut.webp",
            imageAlt: "Black walnut wood grain sample",
            imageCaption: "Black Walnut",
          },
          {
            value: "maple",
            label: "Maple",
            image: "assets/images/wood-species/maple.webp",
            imageAlt: "Maple wood grain sample",
            imageCaption: "Maple",
          },
          {
            value: "oak",
            label: "Oak",
            image: "assets/images/wood-species/oak-wood.webp",
            imageAlt: "Oak wood grain sample",
            imageCaption: "Oak",
          },
          { value: "needs-guidance", label: "Exotics and more Please describe in notes" },
        ],
      },
      {
        id: "personalization",
        label: "Personalization / Message",
        type: "text",
        required: false,
        maxLength: 30,
        helpText: "Maximum 30 characters. Font size and available space will determine what fits. Need more? Describe it in the note section.",
        placeholder: "Name, monogram, date, or phrase",
      },
      {
        id: "engraving_style",
        label: "Engraving Style",
        type: "select",
        required: false,
        choices: [
          { value: "painted", label: "Painted" },
          { value: "epoxy-inlay", label: "Epoxy inlay" },
          { value: "other", label: "Other (Explain in notes)" },
        ],
      },
      {
        id: "font_style",
        label: "Font Style",
        type: "select",
        required: false,
        choices: [
          { value: "classic-serif", label: "Classic serif" },
          { value: "times-roman", label: "Times Roman" },
          { value: "modern-sans", label: "Modern sans" },
          { value: "arial", label: "Arial" },
          { value: "cormorant-garamond", label: "Cormorant Garamond" },
          { value: "marcellus", label: "Marcellus" },
          { value: "josefin-sans", label: "Josefin Sans" },
          { value: "script", label: "Allura" },
          { value: "great-vibes", label: "Great Vibes" },
          { value: "parisienne", label: "Parisienne" },
          { value: "decide-later", label: "* Decide later *" },
        ],
      },
      {
        id: "finish",
        label: "Finish Direction",
        type: "select",
        showChoiceVisual: false,
        required: false,
        choices: [
          { value: "natural", label: "Natural" },
          { value: "oiled", label: "Oiled" },
          { value: "stained", label: "Stained" },
          { value: "lacquer", label: "Lacquer" },
          { value: "other", label: "Other (describe in notes)" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        required: true,
        defaultValue: 1,
        placeholder: "1",
        min: 1,
        max: 100,
      },
      {
        id: "design_notes",
        label: "Gift Notes",
        type: "textarea",
        required: false,
        placeholder: "Describe the occasion, gift tone, budget sensitivity, or any inspiration for the piece.",
      },
    ],
  },
  {
    id: "charcuterie-boards",
    name: "Kitchen & Serving",
    category: "Kitchen & Serving",
    description:
      "A custom kitchen and serving inquiry with room to define piece type, layout, size, wood selection, finish, and personalization details.",
    detailLinkText: "Visit the gallery for more ideas:",
    detailLinkLabel: "Portfolio Gallery",
    detailLinkHref: "https://www.lignumartifex.com/gallery.html",
    active: true,
    image: "assets/images/products/board-1.webp",
    quoteType: "Custom review required",
    rules: [
      "Dimensions, species, finish, and personalization details are finalized during quote review.",
      "Finish recommendations may vary based on intended use, placement, and maintenance needs.",
      "This version collects direction only. Pricing and file uploads remain outside the current release.",
      "Quote responses are typically sent within 48 to 72 hours.",
    ],
    options: [
      {
        id: "board_type",
        label: "Type",
        type: "select",
        required: true,
        choices: [
          { value: "charcuterie-board", label: "Charcuterie board" },
          { value: "cutting-board", label: "Cutting board" },
          { value: "pizza-peel", label: "Pizza Peel" },
          { value: "spice-rack", label: "Spice rack" },
          { value: "custom-board", label: "Custom board" },
        ],
      },
      {
        id: "board_shape",
        label: "Board Shape",
        type: "select",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["spice-rack", "pizza-peel"] },
        choices: [
          {
            value: "rectangular",
            label: "Rectangular",
            image: "assets/images/board-shapes/rectangular.svg",
            imageAlt: "Rectangular board shape preview",
            imageCaption: "Rectangular",
          },
          {
            value: "square",
            label: "Square",
            image: "assets/images/board-shapes/square.svg",
            imageAlt: "Square board shape preview",
            imageCaption: "Square",
          },
          {
            value: "rounded-rectangle",
            label: "Rounded rectangle",
            image: "assets/images/board-shapes/rounded-rectangle.svg",
            imageAlt: "Rounded rectangle board shape preview",
            imageCaption: "Rounded rectangle",
          },
          {
            value: "paddle-handle",
            label: "Paddle with handle",
            image: "assets/images/board-shapes/paddle-handle.svg",
            imageAlt: "Paddle handle board shape preview",
            imageCaption: "Paddle with handle",
            showWhen: { field: "board_type", equals: "charcuterie-board" },
          },
          {
            value: "live-edge",
            label: "Live edge style",
            image: "assets/images/board-shapes/live-edge.svg",
            imageAlt: "Live edge board shape preview",
            imageCaption: "Live edge style",
            showWhen: { field: "board_type", equalsAny: ["charcuterie-board", "cutting-board"] },
          },
          {
            value: "epoxy-river-inlay",
            label: "Epoxy river inlay",
            showWhen: { field: "board_type", equalsAny: ["charcuterie-board", "cutting-board"] },
          },
          {
            value: "custom-shape",
            label: "Custom shape",
            image: "assets/images/board-shapes/custom-shape.svg",
            imageAlt: "Custom board shape preview",
            imageCaption: "Custom shape",
          },
        ],
      },
      {
        id: "pizza_peel_dimension",
        label: "Size",
        type: "select",
        required: true,
        suppressConditionalHighlight: true,
        showWhen: { field: "board_type", equals: "pizza-peel" },
        choices: [
          { value: "12", label: "12 in" },
          { value: "14", label: "14 in" },
          { value: "16", label: "16 in" },
          { value: "custom", label: "Custom size" },
        ],
      },
      {
        id: "pizza_peel_custom_size",
        label: "Custom Size",
        type: "text",
        required: true,
        suppressConditionalHighlight: true,
        showWhen: { field: "pizza_peel_dimension", equals: "custom" },
        placeholder: "Enter custom size",
      },
      {
        id: "orientation",
        label: "Orientation",
        type: "select",
        required: true,
        suppressConditionalHighlight: true,
        showWhen: { field: "board_type", equals: "spice-rack" },
        choices: [
          {
            value: "upright",
            label: "Upright",
            image: "assets/images/spice-rack-orientation/upright.png",
            imageAlt: "Upright spice rack preview",
            imageCaption: "Upright",
          },
          {
            value: "table-top",
            label: "Table top",
            image: "assets/images/spice-rack-orientation/table-top.png",
            imageAlt: "Table top spice rack preview",
            imageCaption: "Table top",
          },
        ],
      },
      {
        id: "length",
        label: "Length",
        type: "select",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["spice-rack", "pizza-peel"] },
        helpMedia: {
          src: "assets/images/dimension-guides/board-length-guide.svg",
          alt: "Length runs from one end of the board to the other.",
          valueSource: {
            field: "length",
            customField: "custom_length",
            customTriggerValue: "other",
            unit: "in",
          },
        },
        choices: [
          { value: "10", label: "10 in" },
          { value: "12", label: "12 in" },
          { value: "16", label: "16 in" },
          { value: "20", label: "20 in" },
          { value: "24", label: "24 in" },
          { value: "other", label: "Other (please fill in your amount)" },
        ],
      },
      {
        id: "custom_length",
        label: "Custom Length",
        type: "number",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["spice-rack", "pizza-peel"] },
        placeholder: "20",
        unit: "in",
        min: 8,
        max: 48,
        showWhen: { field: "length", equals: "other" },
      },
      {
        id: "width",
        label: "Width",
        type: "select",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["spice-rack", "pizza-peel"] },
        helpMedia: {
          src: "assets/images/dimension-guides/board-width-guide.svg",
          alt: "Width runs across the board from side to side.",
          valueSource: {
            field: "width",
            customField: "custom_width",
            customTriggerValue: "other",
            unit: "in",
          },
        },
        choices: [
          { value: "6", label: "6 in" },
          { value: "8", label: "8 in" },
          { value: "10", label: "10 in" },
          { value: "12", label: "12 in" },
          { value: "14", label: "14 in" },
          { value: "other", label: "Other (please fill in your amount)" },
        ],
      },
      {
        id: "custom_width",
        label: "Custom Width",
        type: "number",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["spice-rack", "pizza-peel"] },
        placeholder: "10",
        unit: "in",
        min: 6,
        max: 24,
        showWhen: { field: "width", equals: "other" },
      },
      {
        id: "thickness",
        label: "Thickness",
        type: "select",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["spice-rack", "pizza-peel"] },
        choices: [
          {
            value: "0.625",
            label: "5/8 in",
            showWhen: { field: "board_type", equals: "charcuterie-board" },
          },
          {
            value: "0.625",
            label: "5/8 in",
            showWhen: { field: "board_type", equals: "spice-rack" },
          },
          {
            value: "0.75",
            label: "3/4 in",
            showWhen: { field: "board_type", equals: "charcuterie-board" },
          },
          {
            value: "0.75",
            label: "3/4 in",
            showWhen: { field: "board_type", equals: "spice-rack" },
          },
          {
            value: "1",
            label: "1 in",
            showWhen: { field: "board_type", equals: "charcuterie-board" },
          },
          {
            value: "1",
            label: "1 in",
            showWhen: { field: "board_type", equals: "spice-rack" },
          },
          {
            value: "1.5",
            label: "1 1/2 in",
            showWhen: { field: "board_type", equals: "cutting-board" },
          },
          {
            value: "2",
            label: "2 in",
            showWhen: { field: "board_type", equals: "cutting-board" },
          },
          {
            value: "2.5",
            label: "2 1/2 in",
            showWhen: { field: "board_type", equals: "cutting-board" },
          },
          {
            value: "3",
            label: "3 in",
            showWhen: { field: "board_type", equals: "cutting-board" },
          },
        ],
      },
      {
        id: "wood_species",
        label: "Wood Species",
        type: "select",
        required: true,
        hideWhen: { field: "board_type", equals: "pizza-peel" },
        choices: [
          {
            value: "walnut",
            label: "Walnut",
            image: "assets/images/wood-species/black-walnut.webp",
            imageAlt: "Black walnut wood grain sample",
            imageCaption: "Black Walnut",
          },
          {
            value: "maple",
            label: "Maple",
            image: "assets/images/wood-species/maple.webp",
            imageAlt: "Maple wood grain sample",
            imageCaption: "Maple",
          },
          {
            value: "oak",
            label: "Oak",
            image: "assets/images/wood-species/oak-wood.webp",
            imageAlt: "Oak wood grain sample",
            imageCaption: "Oak",
          },
          {
            value: "olive-wood",
            label: "Olive wood",
            image: "assets/images/wood-species/olive-wood.jpg",
            imageAlt: "Olive wood grain sample",
            imageCaption: "Olive wood",
          },
          {
            value: "pear-wood",
            label: "Pear wood",
            image: "assets/images/wood-species/pear-wood.jpg",
            imageAlt: "Pear wood grain sample",
            imageCaption: "Pear wood",
          },
          { value: "needs-guidance", label: "Exotics and more Please describe in notes" },
        ],
      },
      {
        id: "handle_style",
        label: "Handle / Grip",
        type: "checkbox-group",
        showEmptyPlaceholder: true,
        emptyPlaceholderText: "Pick type first",
        deferChoicesUntil: "board_type",
        required: true,
        hideWhen: { field: "board_type", equalsAny: ["custom-board", "spice-rack"] },
        choices: [
          {
            value: "none",
            label: "No handle",
            exclusive: true,
            showWhen: { field: "board_type", equals: "charcuterie-board" },
          },
          {
            value: "cutout",
            label: "Integrated cutout",
            exclusive: true,
            showWhen: { field: "board_type", equals: "cutting-board" },
          },
          {
            value: "extended-paddle",
            label: "Paddle Handle (comes with hanging hole)",
            exclusive: true,
            showWhen: { field: "board_type", equals: "charcuterie-board" },
          },
          {
            value: "juice-groove",
            label: "Juice Groove",
            exclusive: true,
            showWhen: { field: "board_type", equals: "cutting-board" },
          },
          {
            value: "hanging-hole",
            label: "Hanging hole",
            exclusive: true,
            showWhen: { field: "board_type", equals: "charcuterie-board" },
            hideWhen: { field: "handle_style", equals: "extended-paddle" },
          },
          {
            value: "regular-handle",
            label: "Regular handle",
            exclusive: true,
            showWhen: { field: "board_type", equals: "pizza-peel" },
          },
          {
            value: "guiat-neck",
            label: "Guitar Neck",
            exclusive: true,
            showWhen: { field: "board_type", equals: "pizza-peel" },
          },
          {
            value: "custom",
            label: "Custom",
            exclusive: true,
            showWhen: { field: "board_type", equals: "pizza-peel" },
          },
        ],
      },
      {
        id: "finish",
        label: "Finish Direction",
        type: "select",
        showChoiceVisual: false,
        required: true,
        choices: [
          { value: "natural", label: "Natural", hideWhen: { field: "board_type", equals: "pizza-peel" } },
          { value: "laquered", label: "Laquered", hideWhen: { field: "board_type", equals: "pizza-peel" } },
          { value: "painted", label: "Painted", hideWhen: { field: "board_type", equals: "pizza-peel" } },
          { value: "unfinished", label: "Unfinished", showWhen: { field: "board_type", equals: "pizza-peel" } },
          {
            value: "food-grade-finish",
            label: "Food grade finish",
            showWhen: { field: "board_type", equals: "pizza-peel" },
          },
        ],
      },
      {
        id: "engraving",
        label: "Personalization / Message",
        type: "text",
        required: false,
        hideWhen: { field: "board_type", equals: "pizza-peel" },
        maxLength: 30,
        helpText: "Maximum 30 characters. Font size and available space will determine what fits. Need more? Describe it in the note section.",
        placeholder: "Name, monogram, date, or phrase",
      },
      {
        id: "engraving_style",
        label: "Engraving Style",
        type: "select",
        required: false,
        hideWhen: { field: "board_type", equals: "pizza-peel" },
        choices: [
          { value: "painted", label: "Painted" },
          { value: "epoxy-inlay", label: "Epoxy inlay" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "font_style",
        label: "Font Style",
        type: "select",
        required: false,
        hideWhen: { field: "board_type", equals: "pizza-peel" },
        choices: [
          { value: "classic-serif", label: "Classic serif" },
          { value: "times-roman", label: "Times Roman" },
          { value: "modern-sans", label: "Modern sans" },
          { value: "arial", label: "Arial" },
          { value: "cormorant-garamond", label: "Cormorant Garamond" },
          { value: "marcellus", label: "Marcellus" },
          { value: "josefin-sans", label: "Josefin Sans" },
          { value: "script", label: "Allura" },
          { value: "great-vibes", label: "Great Vibes" },
          { value: "parisienne", label: "Parisienne" },
          { value: "decide-later", label: "* Decide later *" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        required: true,
        defaultValue: 1,
        placeholder: "1",
        min: 1,
        max: 50,
      },
      {
        id: "artwork_inlay",
        label: "Do You Have Or Do You Want Custom Artwork Inlay On The Board?",
        type: "checkbox",
        required: false,
        hideWhen: { field: "board_type", equals: "spice-rack" },
        checkboxLabel: "Yes",
        checkedNote: "Explain in Board Notes.",
      },
      {
        id: "design_notes",
        label: "Project Notes",
        type: "textarea",
        required: false,
        placeholder: "Reference the use case, placement, spice storage needs, serving style, or any edge/detail preferences.",
      },
    ],
  },
  {
    id: "river-tables",
    name: "River Tables",
    category: "Furniture",
    description:
      "A table inquiry for resin river builds, slab pairing, base style, and room-specific size planning.",
    detailLinkText: "Visit the gallery for more ideas:",
    detailLinkLabel: "Portfolio Gallery",
    detailLinkHref: "https://www.lignumartifex.com/gallery.html",
    active: true,
    image: "assets/images/products/rivertable.webp",
    quoteType: "Custom review required",
    rules: [
      "River table slab selection and resin tone are confirmed during quote review.",
      "Large-format pieces may require delivery and installation planning based on the final dimensions.",
      "This form captures direction only. Final pricing, drawings, and finish samples happen afterward.",
      "Quote responses are typically sent within 48 to 72 hours.",
    ],
    options: [
      {
        id: "table_type",
        label: "Table Type",
        type: "select",
        required: true,
        choices: [
          { value: "dining-table", label: "Dining table" },
          { value: "coffee-table", label: "Coffee table" },
          { value: "desk", label: "Desk" },
          {
            value: "water-fall-end",
            label: "Water Fall End",
            image: "assets/images/river-table-types/waterfall-edge.webp",
            imageAlt: "Water Fall End table type preview",
            imageCaption: "Water Fall End",
          },
        ],
      },
      {
        id: "wood_species",
        label: "Wood Species",
        type: "select",
        required: true,
        choices: [
          {
            value: "walnut",
            label: "Walnut",
            image: "assets/images/wood-species/black-walnut.webp",
            imageAlt: "Black walnut wood grain sample",
            imageCaption: "Black Walnut",
          },
          {
            value: "maple",
            label: "Maple",
            image: "assets/images/wood-species/maple.webp",
            imageAlt: "Maple wood grain sample",
            imageCaption: "Maple",
          },
          {
            value: "oak",
            label: "Oak",
            image: "assets/images/wood-species/oak-wood.webp",
            imageAlt: "Oak wood grain sample",
            imageCaption: "Oak",
          },
          {
            value: "elm",
            label: "Elm",
            image: "assets/images/wood-species/elm-wood.webp",
            imageAlt: "Elm wood grain sample",
            imageCaption: "Elm",
          },
          { value: "needs-guidance", label: "Exotics and more Please describe in notes" },
        ],
      },
      {
        id: "table_description",
        label: "Describe Your Table",
        type: "textarea",
        required: true,
        placeholder:
          "Describe the overall size, seating intent, room placement, slab look, river tone, and any details you already know about the table.",
      },
      {
        id: "river_color",
        label: "River / Resin Tone",
        type: "select",
        presentation: "swatch-grid",
        swatchHeading: "Color",
        showChoiceVisual: false,
        helpText:
          "Choose a resin tone visually. Swatches are reference-only and final color can shift with depth, lighting, and finish.",
        required: true,
        choices: [
          {
            value: "copper",
            label: "Copper",
            swatchImage: "assets/images/resin-colors/copper.png",
            swatchBase: "#9c5637",
            swatchAccent: "#d98a56",
          },
          {
            value: "pearl",
            label: "Pearl",
            swatchImage: "assets/images/resin-colors/pearl.png",
            swatchBase: "#e8e0d4",
            swatchAccent: "#fffaf2",
          },
          {
            value: "whale",
            label: "Whale",
            swatchImage: "assets/images/resin-colors/whale.png",
            swatchBase: "#2e3947",
            swatchAccent: "#66778c",
          },
          {
            value: "azure",
            label: "Azure",
            swatchImage: "assets/images/resin-colors/azure.png",
            swatchBase: "#2567d8",
            swatchAccent: "#6ab7ff",
          },
          {
            value: "smoke",
            label: "Dolphin",
            swatchImage: "assets/images/resin-colors/dolphin.png",
            swatchBase: "#505962",
            swatchAccent: "#aeb5bd",
          },
          {
            value: "caribbean",
            label: "Caribbean",
            swatchImage: "assets/images/resin-colors/caribbean.png",
            swatchBase: "#1fb6c9",
            swatchAccent: "#8ff0ee",
          },
          {
            value: "jungle",
            label: "Jungle",
            swatchImage: "assets/images/resin-colors/jungle.png",
            swatchBase: "#216b46",
            swatchAccent: "#5bc67c",
          },
          {
            value: "maui",
            label: "Maui",
            swatchImage: "assets/images/resin-colors/maui.png",
            swatchBase: "#2db7a3",
            swatchAccent: "#89efe4",
          },
          {
            value: "margarita",
            label: "Margarita",
            swatchImage: "assets/images/resin-colors/margarita.png",
            swatchBase: "#a6d84c",
            swatchAccent: "#dfff86",
          },
          {
            value: "gold",
            label: "Gold",
            swatchImage: "assets/images/resin-colors/gold.png",
            swatchBase: "#c79520",
            swatchAccent: "#ffe06a",
          },
          {
            value: "ocean",
            label: "Ocean",
            swatchImage: "assets/images/resin-colors/ocean.png",
            swatchBase: "#145584",
            swatchAccent: "#4dd0d7",
          },
          {
            value: "royal-purple",
            label: "Royal Purple",
            swatchImage: "assets/images/resin-colors/royal-purple.png",
            swatchBase: "#5631a8",
            swatchAccent: "#8c67e9",
          },
          {
            value: "black",
            label: "Caviar",
            swatchImage: "assets/images/resin-colors/black.png",
            swatchBase: "#11161a",
            swatchAccent: "#4f5961",
          },
          { value: "needs-guidance", label: "Contact for more option" },
        ],
      },
      {
        id: "base_style",
        label: "Base Style",
        type: "select",
        required: true,
        choices: [
          { value: "metal-u", label: "Metal U base" },
          { value: "metal-x", label: "Metal X base" },
          { value: "wood-pedestal", label: "Wood pedestal" },
          { value: "client-supplied", label: "Client supplied base" },
        ],
      },
      {
        id: "finish",
        label: "Finish Direction",
        type: "select",
        showChoiceVisual: false,
        required: true,
        choices: [
          { value: "matte-hardwax", label: "Matte hardwax" },
          { value: "satin-hardwax", label: "Satin hardwax" },
          { value: "lacquer", label: "Lacquer" },
          { value: "other", label: "Other" },
          { value: "needs-guidance", label: "I need finish guidance" },
        ],
      },
      {
        id: "delivery_scope",
        label: "Delivery / Installation",
        type: "select",
        required: false,
        choices: [
          { value: "pickup", label: "Pickup" },
          { value: "local-delivery", label: "Local delivery" },
          { value: "delivery-install", label: "Delivery and installation" },
        ],
      },
    ],
  },
  {
    id: "items-for-sale",
    name: "Items for Sale",
    category: "Available Pieces",
    description:
      "An inquiry for finished pieces, currently available shop items, and one-off work that may already be built or close to ready.",
    active: false,
    hideContactForm: true,
    image: "assets/images/items-for-sale/spice-rack.webp",
    quoteType: "Availability review required",
    rules: [
      "Available pieces can change quickly, so this form is used to confirm interest before availability is promised.",
      "Exact dimensions, species, and finish may vary from piece to piece.",
      "If a listed item is no longer available, similar options can still be discussed after contact.",
      "Quote responses are typically sent within 48 to 72 hours.",
    ],
    options: [
      {
        id: "sale_budget_range",
        label: "Budget Range",
        type: "select",
        required: false,
        choices: [
          { value: "under-150", label: "Under $150" },
          { value: "150-300", label: "$150 to $300" },
          { value: "300-600", label: "$300 to $600" },
          { value: "600-plus", label: "$600+" },
          { value: "open", label: "See all items" },
        ],
      },
      {
        id: "sale_notes",
        label: "Item Notes",
        type: "notice",
        messageHtml:
          'Items appear here as products become available. If you require something more bespoke or unique, contact us and we can help bring your vision to life. For more ideas <a href="https://www.lignumartifex.com/gallery.html" target="_blank" rel="noreferrer">Visit our Gallery</a>.',
        linkLabel: "Contact Us",
        linkHref: "https://www.lignumartifex.com/contact.html",
      },
    ],
  },
];

const state = {
  products: [],
  currentProduct: null,
  selectedSaleItem: null,
};

const form = document.getElementById("customizer-form");
const productSelect = document.getElementById("product-select");
const productCardGrid = document.getElementById("product-card-grid");
const dynamicFields = document.getElementById("dynamic-fields");
const configurationSection = dynamicFields?.closest(".form-section");
const configurationTitleNode = document.getElementById("configuration-title");
const summaryList = document.getElementById("summary-list");
const rulesList = document.getElementById("product-rules");
const statusNode = document.getElementById("form-status");
const submitButton = document.getElementById("submit-button");
const downloadSummaryButton = document.getElementById("download-summary-button");
const summaryActionStatusNode = document.getElementById("summary-action-status");
const clientDetailsSection = document.getElementById("client-details-section");
const formActionsNode = document.getElementById("form-actions");
let imageLightbox = null;

const productNameNode = document.getElementById("product-name");
const productCategoryNode = document.getElementById("product-category");
const productDescriptionNode = document.getElementById("product-description");
const productPreviewFigureNode = document.getElementById("product-preview-figure");
const productPreviewImageNode = document.getElementById("product-preview-image");
const productDescriptionLinkNode = document.getElementById("product-description-link");
const productDescriptionLinkTextNode = document.getElementById("product-description-link-text");
const productDescriptionLinkAnchorNode = document.getElementById("product-description-link-anchor");
const productQuoteTypeNode = document.getElementById("product-quote-type");
const siteHeader = document.querySelector(".site-header");

const hiddenSummary = document.getElementById("hidden-summary");
const hiddenSubject = document.getElementById("hidden-subject");

const FONT_PREVIEW_CLASS_MAP = {
  "classic-serif": "font-preview-serif",
  "times-roman": "font-preview-times-roman",
  "modern-sans": "font-preview-sans",
  arial: "font-preview-arial",
  "cormorant-garamond": "font-preview-cormorant",
  marcellus: "font-preview-marcellus",
  "josefin-sans": "font-preview-josefin",
  script: "font-preview-script",
  "great-vibes": "font-preview-great-vibes",
  parisienne: "font-preview-parisienne",
  "decide-later": "font-preview-neutral",
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  imageLightbox = createImageLightbox();
  bindStaticEvents();

  try {
    const productsResponse = await fetch(PRODUCTS_PATH, { cache: "no-store" });
    if (!productsResponse.ok) {
      throw new Error("Could not load product data.");
    }

    const products = await productsResponse.json();
    const itemsForSale = await loadItemsForSaleInventory();
    state.products = applyItemsForSaleInventory(products.filter((product) => product.active !== false), itemsForSale);

    if (!state.products.length) {
      throw new Error("No active products available.");
    }

    populateProductSelector();
    selectProduct(state.products[0].id);
  } catch (error) {
    console.warn("Falling back to inline product data.", error);
    state.products = applyItemsForSaleInventory(
      FALLBACK_PRODUCTS.filter((product) => product.active !== false),
      FALLBACK_ITEMS_FOR_SALE
    );
    populateProductSelector();
    selectProduct(state.products[0].id);
    setStatus("Loaded fallback product data. For normal use, serve the site from GitHub Pages or a local static server.", false);
  }
}

async function loadItemsForSaleInventory() {
  try {
    const response = await fetch(ITEMS_FOR_SALE_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load items for sale inventory.");
    }

    return await response.json();
  } catch (error) {
    console.warn("Falling back to inline items-for-sale inventory.", error);
    return FALLBACK_ITEMS_FOR_SALE;
  }
}

function applyItemsForSaleInventory(products, inventory) {
  const itemsForSaleInventory = inventory && typeof inventory === "object" ? inventory : FALLBACK_ITEMS_FOR_SALE;
  const normalizedItemsForSaleInventory = normalizeItemsForSaleInventory(itemsForSaleInventory);
  const itemsForSaleCoverImage = findItemsForSaleCoverImage(normalizedItemsForSaleInventory);

  return products.map((product) => {
    if (product.id !== "items-for-sale") {
      return product;
    }

    return {
      ...product,
      image: itemsForSaleCoverImage || product.image,
      options: product.options.map((field) => {
        if (field.id !== "sale_budget_range" || field.type !== "select") {
          return field;
        }

        const allItems = ITEMS_FOR_SALE_RANGE_ORDER.flatMap((range) =>
          cloneGalleryItems(normalizedItemsForSaleInventory[range])
        );

        return {
          ...field,
          choices: field.choices.map((choice) => ({
            ...choice,
            galleryItems:
              choice.value === "open" ? allItems : cloneGalleryItems(normalizedItemsForSaleInventory[choice.value]),
          })),
        };
      }),
    };
  });
}

function normalizeItemsForSaleInventory(inventory) {
  return ITEMS_FOR_SALE_RANGE_ORDER.reduce((normalizedInventory, range) => {
    normalizedInventory[range] = filterValidSaleItems(inventory?.[range]);
    return normalizedInventory;
  }, {});
}

function findItemsForSaleCoverImage(inventory) {
  for (const range of ITEMS_FOR_SALE_RANGE_ORDER) {
    const items = Array.isArray(inventory[range]) ? inventory[range] : [];
    const coverItem = items.find(
      (item) => typeof item?.image === "string" && item.image.trim().length > 0
    );

    if (coverItem) {
      return coverItem.image;
    }
  }

  return "";
}

function filterValidSaleItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => normalizeSaleItem(item))
    .filter((item) => isRenderableSaleItem(item));
}

function normalizeSaleItem(item) {
  return {
    ...item,
    title: normalizeSaleItemText(item?.title),
    subtitle: normalizeSaleItemText(item?.subtitle),
    price: normalizeSaleItemText(item?.price),
    image: normalizeSaleItemText(item?.image),
    imageAlt: normalizeSaleItemText(item?.imageAlt),
  };
}

function normalizeSaleItemText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isRenderableSaleItem(item) {
  const hasTitle = Boolean(item.title);
  const hasVisualOrDetails = Boolean(item.image || item.price || item.subtitle);
  const looksLikePlaceholder = /^placeholder item\b/i.test(item.title);

  return hasTitle && hasVisualOrDetails && !looksLikePlaceholder;
}

function cloneGalleryItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => ({ ...item }));
}

function bindStaticEvents() {
  productSelect.addEventListener("change", (event) => {
    selectProduct(event.target.value, { scrollToConfiguration: true, trackAnalytics: true });
  });

  downloadSummaryButton?.addEventListener("click", handleDownloadSummary);

  const refreshDynamicState = () => {
    syncDynamicChoices();
    applyVisibilityRules();
    updateSwatchPickers();
    updateFieldHelpMediaValues();
    updateCheckedNotes();
    updateFontPreviews();
    updateChoiceVisuals();
    updateSummary();
  };

  form.addEventListener("input", refreshDynamicState);
  form.addEventListener("change", (event) => {
    enforceCheckboxGroupRules(event.target);
    refreshDynamicState();
  });

  form.addEventListener("submit", handleSubmit);

  dynamicFields?.addEventListener("click", handleSaleItemSelection);
  dynamicFields?.addEventListener("keydown", handleSaleItemSelectionKeydown);
  dynamicFields?.addEventListener("click", handleLightboxTrigger);
  dynamicFields?.addEventListener("keydown", handleLightboxKeydown);
  document.addEventListener("keydown", handleLightboxEscape);
}

function createImageLightbox() {
  const overlay = document.createElement("div");
  overlay.className = "image-lightbox is-hidden";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="image-lightbox-backdrop" data-lightbox-close="true"></div>
    <figure class="image-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Expanded image preview">
      <button type="button" class="image-lightbox-close" data-lightbox-close="true" aria-label="Close image preview">Close</button>
      <img class="image-lightbox-image" alt="" />
    </figure>
  `;

  overlay.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.lightboxClose === "true") {
      closeImageLightbox();
    }
  });

  document.body.append(overlay);
  return overlay;
}

function openImageLightbox(src, altText = "") {
  if (!imageLightbox || !src) {
    return;
  }

  const imageNode = imageLightbox.querySelector(".image-lightbox-image");
  if (!(imageNode instanceof HTMLImageElement)) {
    return;
  }

  imageNode.src = src;
  imageNode.alt = altText;
  imageLightbox.classList.remove("is-hidden");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-is-open");
}

function closeImageLightbox() {
  if (!imageLightbox) {
    return;
  }

  const imageNode = imageLightbox.querySelector(".image-lightbox-image");
  if (imageNode instanceof HTMLImageElement) {
    imageNode.removeAttribute("src");
    imageNode.alt = "";
  }

  imageLightbox.classList.add("is-hidden");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-is-open");
}

function handleLightboxTrigger(event) {
  const trigger = event.target instanceof HTMLElement ? event.target.closest("[data-lightbox-src]") : null;
  if (!(trigger instanceof HTMLElement)) {
    return;
  }

  openImageLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt || "");
}

function handleLightboxKeydown(event) {
  const trigger = event.target instanceof HTMLElement ? event.target.closest("[data-lightbox-src]") : null;
  if (!(trigger instanceof HTMLElement)) {
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  openImageLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt || "");
}

function handleLightboxEscape(event) {
  if (event.key === "Escape") {
    closeImageLightbox();
  }
}

function getSaleItemSelectionKey(item) {
  return [item?.title || "", item?.subtitle || "", item?.price || "", item?.image || ""].join("|");
}

function setSelectedSaleItem(item) {
  state.selectedSaleItem = item
    ? {
        title: item.title || "",
        subtitle: item.subtitle || "",
        price: item.price || "",
        image: item.image || "",
      }
    : null;

  updateSelectedProductMedia();
  updateChoiceVisuals();
  updateSummary();
}

function syncSubmissionHiddenFields() {
  if (!state.currentProduct) {
    return;
  }

  hiddenSubject.value = `Customizer Inquiry - ${state.currentProduct.name}`;
}

function updateSelectedProductMedia() {
  if (!productPreviewFigureNode || !productPreviewImageNode || !state.currentProduct) {
    return;
  }

  const shouldShowSaleItemImage =
    state.currentProduct.id === "items-for-sale" && Boolean(state.selectedSaleItem?.image);

  productPreviewFigureNode.classList.toggle("is-hidden", !shouldShowSaleItemImage);
  productPreviewFigureNode.classList.toggle("product-figure-sale-item", shouldShowSaleItemImage);

  if (!shouldShowSaleItemImage) {
    productPreviewImageNode.removeAttribute("src");
    productPreviewImageNode.alt = "";
    return;
  }

  productPreviewImageNode.src = state.selectedSaleItem.image;
  productPreviewImageNode.alt = state.selectedSaleItem.title || "Selected item";
}

function handleSaleItemSelection(event) {
  const card = event.target instanceof HTMLElement ? event.target.closest("[data-sale-item-card]") : null;
  if (!(card instanceof HTMLElement)) {
    return;
  }

  setSelectedSaleItem({
    title: card.dataset.saleItemTitle || "",
    subtitle: card.dataset.saleItemSubtitle || "",
    price: card.dataset.saleItemPrice || "",
    image: card.dataset.saleItemImage || "",
  });
}

function handleSaleItemSelectionKeydown(event) {
  const card = event.target instanceof HTMLElement ? event.target.closest("[data-sale-item-card]") : null;
  if (!(card instanceof HTMLElement)) {
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  setSelectedSaleItem({
    title: card.dataset.saleItemTitle || "",
    subtitle: card.dataset.saleItemSubtitle || "",
    price: card.dataset.saleItemPrice || "",
    image: card.dataset.saleItemImage || "",
  });
}

function populateProductSelector() {
  productSelect.innerHTML = "";
  productCardGrid.innerHTML = "";

  state.products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.append(option);

    const cardLinkMarkup =
      product.detailLinkText && product.detailLinkLabel && product.detailLinkHref
        ? `<p class="product-card-link">${product.detailLinkText} <a href="${product.detailLinkHref}" target="_blank" rel="noreferrer">${product.detailLinkLabel}</a></p>`
        : "";

    const card = document.createElement("button");
    card.type = "button";
    card.className = "product-card";
    card.dataset.productId = product.id;
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `
      <div class="product-card-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" />
      </div>
      <div class="product-card-body">
        <p class="product-card-kicker">${product.category}</p>
        <h4 class="product-card-title">${product.name}</h4>
        <p class="product-card-copy">${product.description}</p>
        ${cardLinkMarkup}
        <span class="product-card-pill">${product.quoteType}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      selectProduct(product.id, { scrollToConfiguration: true, trackAnalytics: true });
    });
    productCardGrid.append(card);
  });
}

function selectProduct(productId, options = {}) {
  const product = state.products.find((item) => item.id === productId) || state.products[0];
  state.currentProduct = product;
  state.selectedSaleItem = null;
  productSelect.value = product.id;
  syncSelectedProductCard(product.id);

  renderProductDetails(product);
  updateConfigurationHeading(product);
  renderDynamicFields(product);
  updateProductSubmissionVisibility(product);
  syncDynamicChoices();
  applyVisibilityRules();
  updateSwatchPickers();
  updateFieldHelpMediaValues();
  updateCheckedNotes();
  updateFontPreviews();
  updateChoiceVisuals();
  updateSummary();
  clearValidationErrors();
  setStatus("");

  if (options.trackAnalytics) {
    trackAnalyticsEvent("product_selected", {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
    });
  }

  if (options.scrollToConfiguration && configurationSection) {
    window.requestAnimationFrame(() => {
      const headerHeight = siteHeader?.getBoundingClientRect().height || 0;
      const targetTop =
        window.scrollY + configurationSection.getBoundingClientRect().top - headerHeight - 18;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    });
  }
}

function syncSelectedProductCard(productId) {
  const cards = productCardGrid.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const isSelected = card.dataset.productId === productId;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
  });
}

function renderProductDetails(product) {
  productPreviewImageNode.decoding = "async";
  productNameNode.textContent = product.name;
  productCategoryNode.textContent = product.category;
  productDescriptionNode.textContent = product.description;
  const hasDetailLink = Boolean(product.detailLinkText && product.detailLinkLabel && product.detailLinkHref);
  productDescriptionLinkNode.classList.toggle("is-hidden", !hasDetailLink);
  if (hasDetailLink) {
    productDescriptionLinkTextNode.textContent = `${product.detailLinkText} `;
    productDescriptionLinkAnchorNode.textContent = product.detailLinkLabel;
    productDescriptionLinkAnchorNode.href = product.detailLinkHref;
  } else {
    productDescriptionLinkTextNode.textContent = "";
    productDescriptionLinkAnchorNode.textContent = "";
    productDescriptionLinkAnchorNode.removeAttribute("href");
  }
  productQuoteTypeNode.textContent = product.quoteType;

  syncSubmissionHiddenFields();
  updateSelectedProductMedia();

  rulesList.innerHTML = "";
  product.rules.forEach((rule) => {
    const li = document.createElement("li");
    li.textContent = rule;
    rulesList.append(li);
  });
}

function renderDynamicFields(product) {
  dynamicFields.innerHTML = "";

  product.options.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = `field-group${field.type === "textarea" || field.type === "notice" || field.presentation === "swatch-grid" ? " field-group-wide" : ""}`;
    if (field.id === "finish" || field.id === "material_direction") {
      wrapper.classList.add("field-group-compact");
    }
    if (field.showWhen && !field.suppressConditionalHighlight) {
      wrapper.classList.add("field-group-conditional");
    }
    wrapper.dataset.fieldId = field.id;

    const label = document.createElement("span");
    label.className = "field-label";
    label.textContent = field.label;
    if (field.required) {
      const marker = document.createElement("span");
      marker.className = "field-label-mark";
      marker.textContent = " *";
      label.append(marker);
    }
    wrapper.append(label);

    const input = createControl(field);
    if (field.presentation === "swatch-grid") {
      input.classList.add("swatch-select-native");
    }
    wrapper.append(input);

    if (field.presentation === "swatch-grid" && field.type === "select") {
      wrapper.append(createSwatchPicker(field, input));
    }

    if (field.helpText) {
      const help = document.createElement("p");
      help.className = "field-help";
      help.textContent = field.helpText;
      wrapper.append(help);
    }

    if (field.helpMedia?.src) {
      const media = document.createElement("figure");
      media.className = "field-help-media";

      const image = document.createElement("img");
      image.className = "field-help-media-image";
      image.src = field.helpMedia.src;
      image.alt = field.helpMedia.alt || "";
      image.loading = "lazy";
      image.decoding = "async";
      media.append(image);

      if (field.helpMedia.valueSource) {
        const valueBadge = document.createElement("div");
        valueBadge.className = "field-help-media-value is-hidden";
        valueBadge.dataset.helpMediaValueFor = field.id;
        media.append(valueBadge);
      }

      if (field.helpMedia.caption) {
        const caption = document.createElement("figcaption");
        caption.className = "field-help-media-caption";
        caption.textContent = field.helpMedia.caption;
        media.append(caption);
      }

      wrapper.append(media);
    }

    if (field.checkedNote) {
      const checkedNote = document.createElement("p");
      checkedNote.className = "checked-note is-hidden";
      checkedNote.dataset.checkedNoteFor = field.id;
      checkedNote.textContent = field.checkedNote;
      wrapper.append(checkedNote);
    }

    if (field.id === "font_style") {
      const fontPreview = document.createElement("div");
      fontPreview.className = "font-preview is-hidden";
      fontPreview.dataset.fontPreviewFor = field.id;
      fontPreview.innerHTML = `
        <p class="font-preview-kicker">Font Preview</p>
        <p class="font-preview-sample font-preview-neutral">Your font style</p>
        <p class="font-preview-caption">Select a font style to preview it here.</p>
      `;
      wrapper.append(fontPreview);
    }

    if (field.type === "select" && field.showChoiceVisual !== false && field.presentation !== "swatch-grid") {
      const choiceVisual = document.createElement("div");
      choiceVisual.className = "choice-visual is-hidden";
      choiceVisual.dataset.choiceVisualFor = field.id;
      wrapper.append(choiceVisual);
    }

    if (field.type !== "notice") {
      const error = document.createElement("p");
      error.className = "field-error";
      error.dataset.errorFor = field.id;
      wrapper.append(error);
    }

    dynamicFields.append(wrapper);
  });
}

function createControl(field) {
  let control;

  if (field.type === "textarea") {
    control = document.createElement("textarea");
    control.rows = 5;
  } else if (field.type === "notice") {
    control = document.createElement("div");
    control.className = "field-notice";

    const message = document.createElement("p");
    message.className = "field-notice-copy";
    if (field.messageHtml) {
      message.innerHTML = field.messageHtml;
    } else {
      message.textContent = field.message || "";
    }
    control.append(message);

    if (field.linkLabel && field.linkHref) {
      const link = document.createElement("a");
      link.className = "field-notice-link";
      link.href = field.linkHref;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = field.linkLabel;
      control.append(link);
    }
  } else if (field.type === "checkbox") {
    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "checkbox-option checkbox-option-single";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = field.id;
    checkbox.id = field.id;

    const text = document.createElement("span");
    text.textContent = field.checkboxLabel || "Yes";

    checkboxLabel.append(checkbox, text);
    control = checkboxLabel;
  } else if (field.type === "checkbox-group") {
    control = document.createElement("div");
    control.className = "checkbox-group";

    if (field.showEmptyPlaceholder) {
      const emptyState = document.createElement("div");
      emptyState.className = "checkbox-group-empty";
      emptyState.dataset.checkboxEmptyFor = field.id;
      emptyState.textContent = field.emptyPlaceholderText || "";
      control.append(emptyState);
    }

    field.choices.forEach((choice) => {
      const optionId = `${field.id}-${choice.value}`;
      const optionLabel = document.createElement("label");
      optionLabel.className = "checkbox-option";
      optionLabel.htmlFor = optionId;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = optionId;
      checkbox.name = field.id;
      checkbox.value = choice.value;
      checkbox.dataset.fieldType = field.type;
      if (choice.exclusive) {
        checkbox.dataset.exclusive = "true";
      }

      const text = document.createElement("span");
      text.textContent = choice.label;

      optionLabel.append(checkbox, text);
      control.append(optionLabel);
    });
  } else if (field.type === "select") {
    control = document.createElement("select");
  } else {
    control = document.createElement("input");
    control.type = field.type === "number" ? "number" : "text";
  }

  if (field.type !== "checkbox-group" && field.type !== "checkbox" && field.type !== "notice") {
    control.name = field.id;
    control.id = field.id;
  }

  if (field.required && field.type !== "checkbox-group" && field.type !== "checkbox" && field.type !== "notice") {
    control.required = true;
  }

  if (field.placeholder && field.type !== "notice") {
    control.placeholder = field.placeholder;
  }

  if (typeof field.defaultValue !== "undefined" && field.type !== "checkbox" && field.type !== "checkbox-group" && field.type !== "notice") {
    control.value = String(field.defaultValue);
  }

  if (typeof field.maxLength !== "undefined" && field.type !== "notice") {
    control.maxLength = Number(field.maxLength);
  }

  if (typeof field.min !== "undefined" && field.type !== "notice") {
    control.min = String(field.min);
  }

  if (typeof field.max !== "undefined" && field.type !== "notice") {
    control.max = String(field.max);
  }

  if (field.unit && field.type !== "notice") {
    control.dataset.unit = field.unit;
  }

  return control;
}

function updateConfigurationHeading(product) {
  if (!configurationTitleNode) {
    return;
  }

  configurationTitleNode.textContent =
    product.id === "items-for-sale" ? "Items Currently for Sale" : "Define the piece";
}

function updateProductSubmissionVisibility(product) {
  const hideContactForm = Boolean(product.hideContactForm);

  clientDetailsSection?.classList.toggle("is-hidden", hideContactForm);
  formActionsNode?.classList.toggle("is-hidden", hideContactForm);
  statusNode?.classList.toggle("is-hidden", hideContactForm);

  clientDetailsSection
    ?.querySelectorAll("input, select, textarea, button")
    .forEach((control) => {
      control.disabled = hideContactForm;
    });

  if (submitButton) {
    submitButton.disabled = hideContactForm;
  }

  if (hideContactForm) {
    setStatus("");
  }
}

function createSwatchPicker(field, input) {
  const picker = document.createElement("div");
  picker.className = "swatch-picker";
  picker.dataset.swatchPickerFor = field.id;

  const title = document.createElement("p");
  title.className = "swatch-picker-title";
  title.innerHTML = `${field.swatchHeading || "Color"}: <span class="swatch-picker-current">Select a tone</span>`;
  picker.append(title);

  const grid = document.createElement("div");
  grid.className = "swatch-grid";

  field.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch-option";
    button.dataset.value = choice.value;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", choice.label);
    button.title = choice.label;

    if (choice.swatchBase) {
      if (choice.swatchImage) {
        button.classList.add("swatch-option-image");
      } else {
        button.classList.remove("swatch-option-image");
      }
      button.style.setProperty("--swatch-base", choice.swatchBase);
      button.style.setProperty("--swatch-accent", choice.swatchAccent || choice.swatchBase);
      button.innerHTML = choice.swatchImage
        ? `<img class="swatch-option-media" src="${choice.swatchImage}" alt="" loading="lazy" decoding="async" /><span class="visually-hidden">${choice.label}</span>`
        : `<span class="visually-hidden">${choice.label}</span>`;
    } else {
      button.classList.add("swatch-option-text");
      button.textContent = choice.label;
    }

    button.addEventListener("click", () => {
      input.value = choice.value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    grid.append(button);
  });

  picker.append(grid);
  return picker;
}

function getNamedControl(fieldId) {
  return form.elements.namedItem(fieldId);
}

function shouldShowChoice(choice) {
  return matchesVisibilityCondition(choice.showWhen, true) && !matchesVisibilityCondition(choice.hideWhen, false);
}

function matchesVisibilityCondition(condition, defaultValue) {
  if (!condition) {
    return defaultValue;
  }

  const source = getNamedControl(condition.field);
  if (!source) {
    return defaultValue;
  }

  const controlList = getControlList(source);
  const isMultiInputGroup =
    controlList.length > 1 ||
    controlList.some(
      (input) => input instanceof HTMLInputElement && (input.type === "checkbox" || input.type === "radio")
    );

  const values = isMultiInputGroup
    ? controlList.filter((input) => input.checked).map((input) => input.value)
    : [source.value];

  if (Array.isArray(condition.equalsAny) && condition.equalsAny.length > 0) {
    return values.some((value) => condition.equalsAny.includes(value));
  }

  return values.includes(condition.equals);
}

function syncSelectOptions(field, control) {
  if (!control || field.type !== "select") {
    return;
  }

  const previousValue = control.value;
  const visibleChoices = field.choices.filter((choice) => shouldShowChoice(choice));

  control.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Select an option";
  control.append(placeholderOption);

  visibleChoices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = choice.value;
    option.textContent = choice.label;
    control.append(option);
  });

  if (visibleChoices.some((choice) => choice.value === previousValue)) {
    control.value = previousValue;
  } else {
    control.value = "";
  }
}

function syncDynamicChoices() {
  if (!state.currentProduct) {
    return;
  }

  state.currentProduct.options.forEach((field) => {
    if (field.type === "select") {
      syncSelectOptions(field, getNamedControl(field.id));
      return;
    }

    if (field.type === "checkbox-group") {
      syncCheckboxGroupOptions(field, getNamedControl(field.id));
      updateCheckboxGroupPlaceholder(field, getNamedControl(field.id));
    }
  });
}

function syncCheckboxGroupOptions(field, control) {
  if (!control || field.type !== "checkbox-group") {
    return;
  }

  const controls = getControlList(control);
  const choiceMap = new Map(field.choices.map((choice) => [choice.value, choice]));
  const gatingControl = field.deferChoicesUntil ? getNamedControl(field.deferChoicesUntil) : null;
  const isWaitingForParentChoice = Boolean(field.deferChoicesUntil) && !gatingControl?.value;

  controls.forEach((input) => {
    const choice = choiceMap.get(input.value);
    const option = input.closest(".checkbox-option");
    const isVisible = !isWaitingForParentChoice && shouldShowChoice(choice || {});

    if (!option) {
      return;
    }

    option.classList.toggle("is-hidden", !isVisible);
    input.disabled = !isVisible;

    if (!isVisible) {
      input.checked = false;
    }
  });
}

function updateCheckboxGroupPlaceholder(field, control) {
  if (!field.showEmptyPlaceholder || !control || field.type !== "checkbox-group") {
    return;
  }

  const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
  const placeholder = wrapper?.querySelector(`[data-checkbox-empty-for="${field.id}"]`);
  const gatingControl = field.deferChoicesUntil ? getNamedControl(field.deferChoicesUntil) : null;
  const isWaitingForParentChoice = Boolean(field.deferChoicesUntil) && !gatingControl?.value;
  const shouldShow = !wrapper?.classList.contains("is-hidden") && isWaitingForParentChoice;

  if (!placeholder) {
    return;
  }

  placeholder.textContent = field.emptyPlaceholderText || "";
  placeholder.classList.toggle("is-hidden", !shouldShow);
}

function updateSwatchPickers() {
  if (!state.currentProduct) {
    return;
  }

  state.currentProduct.options.forEach((field) => {
    if (field.presentation !== "swatch-grid" || field.type !== "select") {
      return;
    }

    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const picker = wrapper?.querySelector(`[data-swatch-picker-for="${field.id}"]`);
    const currentNode = picker?.querySelector(".swatch-picker-current");
    const input = getNamedControl(field.id);

    if (!wrapper || !picker || !currentNode || !input) {
      return;
    }

    const selectedChoice = field.choices.find((choice) => choice.value === input.value);
    currentNode.textContent = selectedChoice?.label || "Select a tone";

    picker.querySelectorAll(".swatch-option").forEach((button) => {
      const isSelected = button.dataset.value === input.value;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  });
}

function updateFieldHelpMediaValues() {
  if (!state.currentProduct) {
    return;
  }

  state.currentProduct.options.forEach((field) => {
    if (!field.helpMedia?.valueSource) {
      return;
    }

    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const valueBadge = wrapper?.querySelector(`[data-help-media-value-for="${field.id}"]`);
    const displayValue = getHelpMediaDisplayValue(field.helpMedia.valueSource);
    const shouldShow = Boolean(displayValue) && !wrapper?.classList.contains("is-hidden");

    if (!valueBadge) {
      return;
    }

    valueBadge.textContent = displayValue;
    valueBadge.classList.toggle("is-hidden", !shouldShow);
  });
}

function getHelpMediaDisplayValue(valueSource) {
  const primaryControl = getNamedControl(valueSource.field);
  if (!primaryControl) {
    return "";
  }

  const primaryValue = typeof primaryControl.value === "string" ? primaryControl.value.trim() : "";
  if (!primaryValue) {
    return "";
  }

  let resolvedValue = primaryValue;

  if (valueSource.customField && primaryValue === valueSource.customTriggerValue) {
    const customControl = getNamedControl(valueSource.customField);
    const customValue = typeof customControl?.value === "string" ? customControl.value.trim() : "";
    if (!customValue) {
      return "";
    }
    resolvedValue = customValue;
  }

  return valueSource.unit ? `${resolvedValue} ${valueSource.unit}` : resolvedValue;
}

function getControlList(control) {
  if (typeof RadioNodeList !== "undefined" && control instanceof RadioNodeList) {
    return Array.from(control);
  }

  return control ? [control] : [];
}

function getFieldRawValue(field, control) {
  if (!control) {
    return field.type === "checkbox-group" ? [] : field.type === "checkbox" ? false : "";
  }

  if (field.type === "checkbox-group") {
    return getControlList(control)
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  if (field.type === "checkbox") {
    return control.checked;
  }

  return control.value;
}

function setFieldDisabled(control, disabled) {
  getControlList(control).forEach((input) => {
    input.disabled = disabled;
  });
}

function clearFieldValue(field, control) {
  if (field.type === "checkbox-group") {
    getControlList(control).forEach((input) => {
      input.checked = false;
    });
    return;
  }

  if (field.type === "checkbox") {
    if (control) {
      control.checked = false;
    }
    return;
  }

  if (control) {
    control.value = "";
  }
}

function updateCheckedNotes() {
  if (!state.currentProduct) {
    return;
  }

  state.currentProduct.options.forEach((field) => {
    if (!field.checkedNote) {
      return;
    }

    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const note = wrapper?.querySelector(`[data-checked-note-for="${field.id}"]`);
    const input = getNamedControl(field.id);
    const isVisible = wrapper && !wrapper.classList.contains("is-hidden");
    const isChecked = Boolean(input?.checked);

    if (!note) {
      return;
    }

    note.classList.toggle("is-hidden", !(isVisible && isChecked));
  });
}

function enforceCheckboxGroupRules(target) {
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox" || !target.name) {
    return;
  }

  const field = state.currentProduct?.options.find((item) => item.id === target.name && item.type === "checkbox-group");
  if (!field) {
    return;
  }

  const controls = getControlList(getNamedControl(field.id));
  if (!controls.length) {
    return;
  }

  const selectedChoice = field.choices.find((choice) => choice.value === target.value);
  if (!selectedChoice) {
    return;
  }

  if (target.checked && selectedChoice.exclusive) {
    controls.forEach((control) => {
      if (control !== target) {
        control.checked = false;
      }
    });
    return;
  }

  if (target.checked) {
    const exclusiveChoices = new Set(field.choices.filter((choice) => choice.exclusive).map((choice) => choice.value));
    controls.forEach((control) => {
      if (exclusiveChoices.has(control.value)) {
        control.checked = false;
      }
    });
  }
}

function applyVisibilityRules() {
  if (!state.currentProduct) return;

  state.currentProduct.options.forEach((field) => {
    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const input = getNamedControl(field.id);
    const shouldShow = evaluateVisibility(field);

    wrapper.classList.toggle("is-hidden", !shouldShow);
    wrapper.classList.toggle(
      "is-conditional-active",
      Boolean(field.showWhen) && !field.suppressConditionalHighlight && shouldShow
    );
    setFieldDisabled(input, !shouldShow);

    if (field.type !== "checkbox-group" && input) {
      input.required = shouldShow && Boolean(field.required);
    }

    if (!shouldShow) {
      clearFieldValue(field, input);
      setFieldError(field.id, "");
      wrapper.classList.remove("is-invalid");
    }
  });

  updateChoiceVisuals();
}

function evaluateVisibility(field) {
  return matchesVisibilityCondition(field.showWhen, true) && !matchesVisibilityCondition(field.hideWhen, false);
}

function updateSummary() {
  if (!state.currentProduct) return;

  const summaryItems = [];
  const summaryLines = [];

  if (state.currentProduct.id === "items-for-sale" && state.selectedSaleItem?.title) {
    const selectedItemSummary = [
      state.selectedSaleItem.title,
      state.selectedSaleItem.subtitle,
      state.selectedSaleItem.price,
    ]
      .filter(Boolean)
      .join(" | ");
    const line = `Selected Item: ${selectedItemSummary}`;
    summaryItems.push(line);
    summaryLines.push(line);
  }

  state.currentProduct.options.forEach((field) => {
    const input = getNamedControl(field.id);
    const controls = getControlList(input);

    if (!controls.length || controls.every((control) => control.disabled)) {
      return;
    }

    const value = formatFieldValue(field, getFieldRawValue(field, input));
    if (!value) {
      return;
    }

    const line = `${field.label}: ${value}`;
    summaryItems.push(line);
    summaryLines.push(line);
  });

  summaryList.innerHTML = "";

  if (!summaryItems.length) {
    const li = document.createElement("li");
    li.textContent = "Selections will appear here as the product is configured.";
    summaryList.append(li);
  } else {
    summaryItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      summaryList.append(li);
    });
  }

  hiddenSummary.value = [
    `Product: ${state.currentProduct.name}`,
    `Category: ${state.currentProduct.category}`,
    ...summaryLines,
  ].join("\n");
  syncSubmissionHiddenFields();
}

function setSummaryActionStatus(message) {
  if (!summaryActionStatusNode) {
    return;
  }

  summaryActionStatusNode.textContent = message;
}

function buildSnapshotFileName() {
  const productSlug = (state.currentProduct?.name || "inquiry-snapshot")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${productSlug || "inquiry-snapshot"}-snapshot.pdf`;
}

async function waitForRenderedImages(container) {
  const images = Array.from(container.querySelectorAll("img"));

  await Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        })
    )
  );
}

async function renderSnapshotCanvas() {
  updateSummary();

  const html2canvas = window.html2canvas;
  if (typeof html2canvas !== "function") {
    throw new Error("Snapshot renderer is unavailable.");
  }

  const productPreview = document.querySelector(".product-preview");
  const summaryPanel = document.querySelector(".summary-panel");
  const rulesPanel = document.querySelector(".rules-panel");
  if (!productPreview || !summaryPanel || !rulesPanel) {
    throw new Error("Snapshot panels are unavailable.");
  }

  const sandbox = document.createElement("div");
  sandbox.style.position = "fixed";
  sandbox.style.left = "-100000px";
  sandbox.style.top = "0";
  sandbox.style.width = "760px";
  sandbox.style.padding = "18px";
  sandbox.style.background = getComputedStyle(document.body).background;
  sandbox.style.zIndex = "-1";

  const stack = document.createElement("div");
  stack.style.display = "grid";
  stack.style.gap = "26px";

  const productClone = productPreview.cloneNode(true);
  const summaryClone = summaryPanel.cloneNode(true);
  const rulesClone = rulesPanel.cloneNode(true);
  summaryClone.querySelector(".summary-actions")?.remove();
  summaryClone.querySelector("#summary-action-status")?.remove();

  stack.append(productClone, summaryClone, rulesClone);
  sandbox.append(stack);
  document.body.append(sandbox);

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForRenderedImages(sandbox);
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));

    return await html2canvas(sandbox, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
  } finally {
    sandbox.remove();
  }
}

async function handleDownloadSummary() {
  downloadSummaryButton.disabled = true;
  setSummaryActionStatus("Loading snapshot tools...");

  try {
    await ensurePdfLibraries();
  } catch (error) {
    console.error(error);
    setSummaryActionStatus("PDF export tools could not be loaded. Refresh the page and try again.");
    downloadSummaryButton.disabled = false;
    return;
  }

  const jsPDF = window.jspdf?.jsPDF;
  if (!jsPDF) {
    setSummaryActionStatus("PDF export is not available right now. Refresh the page and try again.");
    downloadSummaryButton.disabled = false;
    return;
  }

  const fileName = buildSnapshotFileName();
  setSummaryActionStatus("Building visual snapshot...");

  try {
    const canvas = await renderSnapshotCanvas();
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "legal",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 28;
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;
    const scale = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);
    const renderWidth = canvas.width * scale;
    const renderHeight = canvas.height * scale;
    const offsetX = (pageWidth - renderWidth) / 2;
    const offsetY = (pageHeight - renderHeight) / 2;

    pdf.addImage(imageData, "PNG", offsetX, offsetY, renderWidth, renderHeight);

    pdf.save(fileName);
    setSummaryActionStatus(`Inquiry Snapshot downloaded as ${fileName}.`);
    trackAnalyticsEvent("inquiry_snapshot_downloaded", {
      file_name: fileName,
      product_id: state.currentProduct?.id || "",
      product_name: state.currentProduct?.name || "",
    });
  } catch (error) {
    console.error(error);
    setSummaryActionStatus("Visual PDF export could not be created. Refresh the page and try again.");
  } finally {
    downloadSummaryButton.disabled = false;
  }
}

function updateChoiceVisuals() {
  if (!state.currentProduct) return;

  state.currentProduct.options.forEach((field) => {
    if (field.type !== "select") {
      return;
    }

    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const visual = wrapper?.querySelector(`[data-choice-visual-for="${field.id}"]`);
    const input = getNamedControl(field.id);

    if (!wrapper || !visual || !input) {
      return;
    }

    const choice = field.choices.find((item) => item.value === input.value);
    const hasGallery = Array.isArray(choice?.galleryItems) && choice.galleryItems.length > 0;
    const hasSingleImage = Boolean(choice?.image);
    const hasEmptySaleState =
      field.id === "sale_budget_range" && Boolean(choice) && Boolean(input.value) && !hasGallery && !hasSingleImage;
    const hasVisual = !wrapper.classList.contains("is-hidden") && (hasGallery || hasSingleImage || hasEmptySaleState);

    visual.classList.toggle("is-hidden", !hasVisual);

    if (!hasVisual) {
      if (field.id === "sale_budget_range" && state.selectedSaleItem) {
        state.selectedSaleItem = null;
      }
      visual.innerHTML = "";
      return;
    }

    if (hasEmptySaleState) {
      if (field.id === "sale_budget_range" && state.selectedSaleItem) {
        state.selectedSaleItem = null;
      }

      visual.innerHTML = `
        <div class="choice-visual-empty-state">
          <p class="choice-visual-empty-title">${
            choice.value === "open" ? "No items currently listed" : "No items in this range yet"
          }</p>
          <p class="choice-visual-empty-copy">${getSaleItemsEmptyStateMessage(choice)}</p>
        </div>
        <p class="choice-visual-caption">${getSaleItemsCaption(choice, 0)}</p>
      `;
      return;
    }

    if (hasGallery) {
      const visibleItemKeys = choice.galleryItems.map((item) => getSaleItemSelectionKey(item));
      if (
        field.id === "sale_budget_range" &&
        state.selectedSaleItem &&
        !visibleItemKeys.includes(getSaleItemSelectionKey(state.selectedSaleItem))
      ) {
        state.selectedSaleItem = null;
      }

      visual.innerHTML = `
        <div class="choice-visual-gallery">
          ${choice.galleryItems
            .map(
              (item) => `
                <article
                  class="choice-visual-card${
                    field.id === "sale_budget_range" &&
                    state.selectedSaleItem &&
                    getSaleItemSelectionKey(state.selectedSaleItem) === getSaleItemSelectionKey(item)
                      ? " is-selected"
                      : ""
                  }"
                  data-sale-item-card="true"
                  data-sale-item-title="${escapeHtml(item.title || "")}"
                  data-sale-item-subtitle="${escapeHtml(item.subtitle || "")}"
                  data-sale-item-price="${escapeHtml(item.price || "")}"
                  data-sale-item-image="${escapeHtml(item.image || "")}"
                  role="button"
                  tabindex="0"
                  aria-pressed="${
                    field.id === "sale_budget_range" &&
                    state.selectedSaleItem &&
                    getSaleItemSelectionKey(state.selectedSaleItem) === getSaleItemSelectionKey(item)
                      ? "true"
                      : "false"
                  }"
                >
                  ${
                    item.image
                      ? `
                        <figure class="choice-visual-card-media">
                          <img
                            class="choice-visual-card-image"
                            src="${item.image}"
                            alt="${item.imageAlt || item.title || "Available item"}"
                            loading="lazy"
                            decoding="async"
                            data-lightbox-src="${item.image}"
                            data-lightbox-alt="${item.imageAlt || item.title || "Available item"}"
                            role="button"
                            tabindex="0"
                          />
                        </figure>
                      `
                      : '<div class="choice-visual-placeholder" aria-hidden="true"></div>'
                  }
                  <p class="choice-visual-card-title">${item.title}</p>
                  <p class="choice-visual-card-subtitle">${item.subtitle || choice.label}</p>
                  ${item.price ? `<p class="choice-visual-card-price">${item.price}</p>` : ""}
                </article>
              `
            )
            .join("")}
        </div>
        <p class="choice-visual-caption">${getSaleItemsCaption(choice, choice.galleryItems.length)}</p>
      `;
      return;
    }

    visual.innerHTML = `
      <figure class="choice-visual-frame">
        <img
          class="choice-visual-image"
          src="${choice.image}"
          alt="${choice.imageAlt || `${choice.label} reference`}"
          loading="lazy"
          decoding="async"
          data-lightbox-src="${choice.image}"
          data-lightbox-alt="${choice.imageAlt || `${choice.label} reference`}"
          role="button"
          tabindex="0"
        />
      </figure>
      <p class="choice-visual-caption">${choice.imageCaption || choice.label}</p>
    `;
  });
}

function getSaleItemsEmptyStateMessage(choice) {
  if (choice.value === "open") {
    return "There are no items currently listed for sale. Check back soon for new available pieces.";
  }

  return `There are no items currently listed in the ${choice.label} range. Check back soon for new available pieces.`;
}

function getSaleItemsCaption(choice, itemCount) {
  if (itemCount === 0) {
    return choice.value === "open"
      ? "No items are currently available for sale."
      : `No items are currently available for ${choice.label}.`;
  }

  return choice.value === "open" ? "All items currently available for sale." : `Available items for ${choice.label}.`;
}

function getFontPreviewText() {
  const previewSource = ["engraving", "personalization"]
    .map((fieldId) => getNamedControl(fieldId))
    .find((control) => control && typeof control.value === "string" && control.value.trim());

  return previewSource?.value.trim() || "Your font style";
}

function updateFontPreviews() {
  if (!state.currentProduct) return;

  state.currentProduct.options.forEach((field) => {
    if (field.id !== "font_style") {
      return;
    }

    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const preview = wrapper?.querySelector(`[data-font-preview-for="${field.id}"]`);
    const input = getNamedControl(field.id);

    if (!wrapper || !preview || !input) {
      return;
    }

    const sampleNode = preview.querySelector(".font-preview-sample");
    const captionNode = preview.querySelector(".font-preview-caption");
    const choice = field.choices.find((item) => item.value === input.value);
    const isVisible = !wrapper.classList.contains("is-hidden") && Boolean(choice);
    const previewText = getFontPreviewText();

    preview.classList.toggle("is-hidden", !isVisible);

    if (!isVisible) {
      input.classList.remove("select-is-muted");
      return;
    }

    sampleNode.textContent = previewText;
    sampleNode.className = `font-preview-sample ${FONT_PREVIEW_CLASS_MAP[choice.value] || "font-preview-neutral"}`;
    captionNode.textContent =
      choice.value === "decide-later" ? "A final font can be chosen during quote review." : choice.label;
    input.classList.toggle("select-is-muted", choice.value === "decide-later");
  });
}

function formatFieldValue(field, rawValue) {
  if (field.type === "checkbox") {
    return rawValue ? "Yes" : "";
  }

  if (field.type === "checkbox-group") {
    if (!Array.isArray(rawValue) || !rawValue.length) {
      return "";
    }

    return rawValue
      .map((selected) => field.choices.find((item) => item.value === selected)?.label || selected)
      .join(", ");
  }

  if (!rawValue) {
    return "";
  }

  if (field.type === "select") {
    const choice = field.choices.find((item) => item.value === rawValue);
    return choice ? choice.label : rawValue;
  }

  if (field.type === "number" && field.unit) {
    return `${rawValue} ${field.unit}`;
  }

  return rawValue.trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function handleSubmit(event) {
  event.preventDefault();
  setStatus("");
  clearValidationErrors();

  if (state.currentProduct?.hideContactForm) {
    return;
  }

  if (form.website.value.trim()) {
    setStatus("Submission accepted.", false);
    form.reset();
    selectProduct(state.currentProduct.id);
    return;
  }

  if (!validateForm()) {
    setStatus("Check the highlighted fields before sending the request.", true);
    return;
  }

  updateSummary();
  const summaryPanel = summaryList.closest(".summary-panel");
  const shouldSend = window.confirm(
    "Please review your Inquiry Snapshot before sending.\n\nPress OK to send your quote request, or Cancel to keep reviewing it first."
  );

  if (!shouldSend) {
    summaryPanel?.scrollIntoView({ behavior: "smooth", block: "center" });
    setStatus("Review the Inquiry Snapshot, then send the request when it looks right.", true);
    return;
  }

  const formData = new FormData();
  formData.set("name", form.name.value.trim());
  formData.set("email", form.email.value.trim());
  formData.set("phone", form.phone.value.trim());

  if (form.company.value.trim()) {
    formData.set("company", form.company.value.trim());
  }

  formData.set("deadline", form.deadline.value.trim());
  formData.set("configuration_summary", hiddenSummary.value);
  formData.set("_subject", hiddenSubject.value);

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Formspree rejected the request.");
    }

    setStatus("Inquiry sent. The request is now in the Lignum Artifex quote inbox.", false);
    trackAnalyticsEvent("quote_request_submitted", {
      product_id: state.currentProduct?.id || "",
      product_name: state.currentProduct?.name || "",
      quote_type: state.currentProduct?.quoteType || "",
    });
    const selectedProductId = state.currentProduct.id;
    form.reset();
    selectProduct(selectedProductId);
  } catch (error) {
    setStatus("The request did not send. Try again in a moment or contact Lignum Artifex directly from the main site.", true);
    trackAnalyticsEvent("quote_request_failed", {
      product_id: state.currentProduct?.id || "",
      product_name: state.currentProduct?.name || "",
    });
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Quote Request";
  }
}

function validateForm() {
  let isValid = true;
  let checkboxGroupMessage = "";

  if (state.currentProduct) {
    state.currentProduct.options.forEach((field) => {
      if (field.type !== "checkbox-group" || !field.required) {
        return;
      }

      const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
      if (!wrapper || wrapper.classList.contains("is-hidden")) {
        return;
      }

      const input = getNamedControl(field.id);
      const selectedValues = getFieldRawValue(field, input);

      if (!Array.isArray(selectedValues) || !selectedValues.length) {
        isValid = false;
        wrapper.classList.add("is-invalid");
        setFieldError(field.id, "Select at least one option.");
        checkboxGroupMessage ||= `Please make at least one selection for ${field.label}.`;
        return;
      }

      wrapper.classList.remove("is-invalid");
      setFieldError(field.id, "");
    });
  }

  const controls = Array.from(form.elements).filter((element) => {
    if (!(element instanceof HTMLElement)) return false;
    if (!("name" in element)) return false;
    if (element.disabled) return false;
    if (element.type === "checkbox") return false;
    if (!element.name || element.type === "hidden" || element.name === "website") return false;
    return true;
  });

  controls.forEach((control) => {
    const fieldId = control.name;
    const wrapper = dynamicFields.querySelector(`[data-field-id="${fieldId}"]`) || control.closest(".field-group");

    if (control.required && !String(control.value).trim()) {
      isValid = false;
      wrapper?.classList.add("is-invalid");
      setFieldError(fieldId, "This field is required.");
      return;
    }

    if (control.type === "email" && control.value && !control.validity.valid) {
      isValid = false;
      wrapper?.classList.add("is-invalid");
      setFieldError(fieldId, "Enter a valid email address.");
      return;
    }

    if (control.type === "number" && control.value) {
      const numericValue = Number(control.value);
      const min = control.min ? Number(control.min) : null;
      const max = control.max ? Number(control.max) : null;

      if ((min !== null && numericValue < min) || (max !== null && numericValue > max)) {
        isValid = false;
        wrapper?.classList.add("is-invalid");
        setFieldError(fieldId, `Use a value between ${control.min || "the minimum"} and ${control.max || "the maximum"}.`);
        return;
      }
    }

    wrapper?.classList.remove("is-invalid");
    setFieldError(fieldId, "");
  });

  if (checkboxGroupMessage) {
    window.alert(checkboxGroupMessage);
  }

  return isValid;
}

function clearValidationErrors() {
  form.querySelectorAll(".is-invalid").forEach((node) => {
    node.classList.remove("is-invalid");
  });

  form.querySelectorAll(".field-error").forEach((node) => {
    node.textContent = "";
  });
}

function setFieldError(fieldId, message) {
  const errorNode = form.querySelector(`[data-error-for="${fieldId}"]`);
  if (errorNode) {
    errorNode.textContent = message;
  }
}

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.classList.toggle("is-error", Boolean(message) && isError);
  statusNode.classList.toggle("is-success", Boolean(message) && !isError);
}

