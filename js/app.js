const FORM_ENDPOINT = "https://formspree.io/f/xpqoyjvz";
const PRODUCTS_PATH = "assets/data/products.json";
const FALLBACK_PRODUCTS = [
  {
    id: "charcuterie-boards",
    name: "Charcuterie Boards",
    category: "Serving Boards",
    description:
      "A custom serving board inquiry with room to define shape, size, wood selection, handle detail, and engraving direction.",
    active: true,
    image: "assets/images/hero.png",
    quoteType: "Custom review required",
    rules: [
      "Board dimensions, species, and engraving depth are finalized during quote review.",
      "Food-safe finish assumptions are captured here, but final recommendations may depend on intended use.",
      "This version collects direction only. Pricing and file uploads remain outside the current release.",
    ],
    options: [
      {
        id: "board_shape",
        label: "Board Shape",
        type: "select",
        required: true,
        choices: [
          { value: "rectangular", label: "Rectangular" },
          { value: "rounded-rectangle", label: "Rounded rectangle" },
          { value: "paddle-handle", label: "Paddle with handle" },
          { value: "live-edge", label: "Live edge style" },
        ],
      },
      {
        id: "length",
        label: "Length",
        type: "number",
        required: true,
        placeholder: "20",
        unit: "in",
        min: 8,
        max: 48,
      },
      {
        id: "width",
        label: "Width",
        type: "number",
        required: true,
        placeholder: "10",
        unit: "in",
        min: 6,
        max: 24,
      },
      {
        id: "thickness",
        label: "Thickness",
        type: "number",
        required: false,
        placeholder: "1.25",
        unit: "in",
        min: 0.75,
        max: 3,
      },
      {
        id: "wood_species",
        label: "Wood Species",
        type: "select",
        required: true,
        choices: [
          { value: "walnut", label: "Walnut" },
          { value: "maple", label: "Maple" },
          { value: "white-oak", label: "White oak" },
          { value: "mixed-hardwood", label: "Mixed hardwood" },
          { value: "needs-guidance", label: "I need species guidance" },
        ],
      },
      {
        id: "handle_style",
        label: "Handle / Grip",
        type: "select",
        required: false,
        choices: [
          { value: "none", label: "No handle" },
          { value: "cutout", label: "Integrated cutout" },
          { value: "extended-paddle", label: "Extended paddle handle" },
          { value: "hanging-hole", label: "Hanging hole" },
        ],
      },
      {
        id: "finish",
        label: "Finish Direction",
        type: "select",
        required: true,
        choices: [
          { value: "food-safe-oil", label: "Food-safe oil" },
          { value: "hardwax-oil", label: "Hardwax oil" },
          { value: "needs-guidance", label: "I need finish guidance" },
        ],
      },
      {
        id: "engraving",
        label: "Personalization / Engraving",
        type: "text",
        required: false,
        placeholder: "Monogram, name, date, or short phrase",
      },
      {
        id: "font_style",
        label: "Font Style",
        type: "select",
        required: false,
        choices: [
          { value: "decide-later", label: "Decide later" },
          { value: "classic-serif", label: "Classic serif" },
          { value: "modern-sans", label: "Modern sans" },
          { value: "script", label: "Script" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        required: true,
        placeholder: "1",
        min: 1,
        max: 50,
      },
      {
        id: "design_notes",
        label: "Board Notes",
        type: "textarea",
        required: false,
        placeholder: "Reference the use case, serving style, gift context, or any edge/detail preferences.",
      },
    ],
  },
  {
    id: "river-tables",
    name: "River Tables",
    category: "Furniture",
    description:
      "A table inquiry for resin river builds, slab pairing, base style, and room-specific size planning.",
    active: true,
    image: "assets/images/hero.png",
    quoteType: "Custom review required",
    rules: [
      "River table slab selection and resin tone are confirmed during quote review.",
      "Large-format pieces may require delivery and installation planning based on the final dimensions.",
      "This form captures direction only. Final pricing, drawings, and finish samples happen afterward.",
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
          { value: "console-table", label: "Console table" },
          { value: "desk", label: "Desk" },
        ],
      },
      {
        id: "length",
        label: "Length",
        type: "number",
        required: true,
        placeholder: "72",
        unit: "in",
        min: 24,
        max: 144,
      },
      {
        id: "width",
        label: "Width",
        type: "number",
        required: true,
        placeholder: "36",
        unit: "in",
        min: 16,
        max: 60,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        required: false,
        placeholder: "30",
        unit: "in",
        min: 14,
        max: 42,
      },
      {
        id: "wood_species",
        label: "Wood Species",
        type: "select",
        required: true,
        choices: [
          { value: "walnut", label: "Walnut" },
          { value: "maple", label: "Maple" },
          { value: "oak", label: "Oak" },
          { value: "elm", label: "Elm" },
          { value: "needs-guidance", label: "I need slab guidance" },
        ],
      },
      {
        id: "river_color",
        label: "River / Resin Tone",
        type: "select",
        required: true,
        choices: [
          { value: "clear", label: "Clear" },
          { value: "smoke", label: "Smoke" },
          { value: "deep-blue", label: "Deep blue" },
          { value: "black", label: "Black" },
          { value: "needs-guidance", label: "I need resin guidance" },
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
        id: "edge_style",
        label: "Edge Style",
        type: "select",
        required: true,
        choices: [
          { value: "natural-live-edge", label: "Natural live edge" },
          { value: "straightened-live-edge", label: "Straightened live edge" },
          { value: "clean-square", label: "Clean square edge" },
        ],
      },
      {
        id: "finish",
        label: "Finish Direction",
        type: "select",
        required: true,
        choices: [
          { value: "matte-hardwax", label: "Matte hardwax" },
          { value: "satin-hardwax", label: "Satin hardwax" },
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
      {
        id: "design_notes",
        label: "Table Notes",
        type: "textarea",
        required: false,
        placeholder: "Reference the room, seating requirements, color direction, or any slab/resin inspiration.",
      },
    ],
  },
  {
    id: "custom-sign-template",
    name: "Custom Sign Template",
    category: "Placeholder Product",
    description:
      "A starter configuration for future signs, plaques, or engraved pieces. The schema is real even though the product details are provisional.",
    active: true,
    image: "assets/images/hero.png",
    quoteType: "Custom review required",
    rules: [
      "This product is a placeholder template so real catalog items can be added later without rebuilding the UI.",
      "Font selection is already supported as an optional field for future engraved or lettered products.",
      "Final pricing, uploads, and checkout are intentionally outside the first release.",
    ],
    options: [
      {
        id: "size_mode",
        label: "Size Approach",
        type: "select",
        required: true,
        choices: [
          { value: "standard-guidance", label: "I want standard size guidance" },
          { value: "custom-dimensions", label: "I know the custom dimensions" },
        ],
      },
      {
        id: "standard_size",
        label: "Suggested Size Range",
        type: "select",
        required: true,
        helpText: "Use this until you have exact product measurements.",
        showWhen: { field: "size_mode", equals: "standard-guidance" },
        choices: [
          { value: "small-12-18", label: "Small | 12 to 18 in" },
          { value: "medium-24-30", label: "Medium | 24 to 30 in" },
          { value: "large-36-plus", label: "Large | 36 in or more" },
        ],
      },
      {
        id: "width",
        label: "Width",
        type: "number",
        required: true,
        placeholder: "24",
        unit: "in",
        min: 4,
        max: 96,
        showWhen: { field: "size_mode", equals: "custom-dimensions" },
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        required: true,
        placeholder: "12",
        unit: "in",
        min: 4,
        max: 60,
        showWhen: { field: "size_mode", equals: "custom-dimensions" },
      },
      {
        id: "material",
        label: "Material Direction",
        type: "select",
        required: true,
        choices: [
          { value: "hardwood", label: "Hardwood" },
          { value: "paint-grade", label: "Paint-grade panel" },
          { value: "plywood-core", label: "Plywood core" },
          { value: "needs-guidance", label: "I need material guidance" },
        ],
      },
      {
        id: "finish",
        label: "Finish Direction",
        type: "select",
        required: true,
        choices: [
          { value: "natural-oil", label: "Natural / oiled" },
          { value: "stained", label: "Stained" },
          { value: "painted", label: "Painted" },
          { value: "needs-guidance", label: "I need finish guidance" },
        ],
      },
      {
        id: "copy_text",
        label: "Text / Engraving Copy",
        type: "text",
        required: false,
        placeholder: "Enter the wording for the piece",
      },
      {
        id: "font_style",
        label: "Font Style",
        type: "select",
        required: false,
        helpText: "This field exists now so product-specific font lists can be added later.",
        choices: [
          { value: "none-yet", label: "Decide later" },
          { value: "classic-serif", label: "Classic serif" },
          { value: "clean-sans", label: "Clean sans" },
          { value: "script-inspired", label: "Script-inspired" },
        ],
      },
      {
        id: "mounting",
        label: "Mounting Direction",
        type: "select",
        required: true,
        choices: [
          { value: "wall-mounted", label: "Wall mounted" },
          { value: "stand-off-hardware", label: "Stand-off hardware" },
          { value: "freestanding", label: "Freestanding" },
          { value: "needs-guidance", label: "I need mounting guidance" },
        ],
      },
      {
        id: "edge_profile",
        label: "Edge / Profile",
        type: "select",
        required: false,
        choices: [
          { value: "square", label: "Square edge" },
          { value: "eased", label: "Eased edge" },
          { value: "bevel", label: "Bevel" },
          { value: "decide-later", label: "Decide later" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        required: true,
        placeholder: "1",
        min: 1,
        max: 100,
      },
      {
        id: "design_notes",
        label: "Product-Specific Notes",
        type: "textarea",
        required: false,
        placeholder: "Add any constraints, installation context, or design cues for this specific product.",
      },
    ],
  },
];

const state = {
  products: [],
  currentProduct: null,
};

const form = document.getElementById("customizer-form");
const productSelect = document.getElementById("product-select");
const dynamicFields = document.getElementById("dynamic-fields");
const summaryList = document.getElementById("summary-list");
const rulesList = document.getElementById("product-rules");
const statusNode = document.getElementById("form-status");
const submitButton = document.getElementById("submit-button");

const productNameNode = document.getElementById("product-name");
const productCategoryNode = document.getElementById("product-category");
const productDescriptionNode = document.getElementById("product-description");
const productImageNode = document.getElementById("product-image");
const productQuoteTypeNode = document.getElementById("product-quote-type");

const hiddenProductName = document.getElementById("hidden-product-name");
const hiddenProductCategory = document.getElementById("hidden-product-category");
const hiddenQuoteType = document.getElementById("hidden-quote-type");
const hiddenProductImageUrl = document.getElementById("hidden-product-image-url");
const hiddenSummary = document.getElementById("hidden-summary");
const hiddenSubject = document.getElementById("hidden-subject");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindStaticEvents();

  try {
    const response = await fetch(PRODUCTS_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load product data.");
    }

    const products = await response.json();
    state.products = products.filter((product) => product.active !== false);

    if (!state.products.length) {
      throw new Error("No active products available.");
    }

    populateProductSelector();
    selectProduct(state.products[0].id);
  } catch (error) {
    console.warn("Falling back to inline product data.", error);
    state.products = FALLBACK_PRODUCTS;
    populateProductSelector();
    selectProduct(state.products[0].id);
    setStatus("Loaded fallback product data. For normal use, serve the site from GitHub Pages or a local static server.", false);
  }
}

function bindStaticEvents() {
  productSelect.addEventListener("change", (event) => {
    selectProduct(event.target.value);
  });

  form.addEventListener("input", () => {
    applyVisibilityRules();
    updateSummary();
  });

  form.addEventListener("submit", handleSubmit);
}

function populateProductSelector() {
  productSelect.innerHTML = "";

  state.products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.append(option);
  });
}

function selectProduct(productId) {
  const product = state.products.find((item) => item.id === productId) || state.products[0];
  state.currentProduct = product;
  productSelect.value = product.id;

  renderProductDetails(product);
  renderDynamicFields(product);
  applyVisibilityRules();
  updateSummary();
  clearValidationErrors();
  setStatus("");
}

function renderProductDetails(product) {
  productNameNode.textContent = product.name;
  productCategoryNode.textContent = product.category;
  productDescriptionNode.textContent = product.description;
  productImageNode.src = product.image;
  productImageNode.alt = `${product.name} preview`;
  productQuoteTypeNode.textContent = product.quoteType;

  hiddenProductName.value = product.name;
  hiddenProductCategory.value = product.category;
  hiddenQuoteType.value = product.quoteType;
  hiddenProductImageUrl.value = resolveAbsoluteUrl(product.image);
  hiddenSubject.value = `Customizer Inquiry - ${product.name}`;

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
    const wrapper = document.createElement("label");
    wrapper.className = `field-group${field.type === "textarea" ? " field-group-wide" : ""}`;
    wrapper.dataset.fieldId = field.id;

    const label = document.createElement("span");
    label.className = "field-label";
    label.textContent = field.label;
    wrapper.append(label);

    const input = createControl(field);
    wrapper.append(input);

    if (field.helpText) {
      const help = document.createElement("p");
      help.className = "field-help";
      help.textContent = field.helpText;
      wrapper.append(help);
    }

    const error = document.createElement("p");
    error.className = "field-error";
    error.dataset.errorFor = field.id;
    wrapper.append(error);

    dynamicFields.append(wrapper);
  });
}

function createControl(field) {
  let control;

  if (field.type === "textarea") {
    control = document.createElement("textarea");
    control.rows = 5;
  } else if (field.type === "select") {
    control = document.createElement("select");

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Select an option";
    control.append(placeholderOption);

    field.choices.forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice.value;
      option.textContent = choice.label;
      control.append(option);
    });
  } else {
    control = document.createElement("input");
    control.type = field.type === "number" ? "number" : "text";
  }

  control.name = field.id;
  control.id = field.id;

  if (field.required) {
    control.required = true;
  }

  if (field.placeholder) {
    control.placeholder = field.placeholder;
  }

  if (typeof field.min !== "undefined") {
    control.min = String(field.min);
  }

  if (typeof field.max !== "undefined") {
    control.max = String(field.max);
  }

  if (field.unit) {
    control.dataset.unit = field.unit;
  }

  return control;
}

function applyVisibilityRules() {
  if (!state.currentProduct) return;

  state.currentProduct.options.forEach((field) => {
    const wrapper = dynamicFields.querySelector(`[data-field-id="${field.id}"]`);
    const input = form.elements[field.id];
    const shouldShow = evaluateVisibility(field);

    wrapper.classList.toggle("is-hidden", !shouldShow);
    input.disabled = !shouldShow;
    input.required = shouldShow && Boolean(field.required);

    if (!shouldShow) {
      input.value = "";
      setFieldError(field.id, "");
      wrapper.classList.remove("is-invalid");
    }
  });
}

function evaluateVisibility(field) {
  if (!field.showWhen) {
    return true;
  }

  const source = form.elements[field.showWhen.field];
  if (!source) {
    return true;
  }

  return source.value === field.showWhen.equals;
}

function updateSummary() {
  if (!state.currentProduct) return;

  const summaryItems = [];
  const summaryLines = [];

  state.currentProduct.options.forEach((field) => {
    const input = form.elements[field.id];
    if (!input || input.disabled) {
      return;
    }

    const value = formatFieldValue(field, input.value);
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
    `Quote Type: ${state.currentProduct.quoteType}`,
    ...summaryLines,
  ].join("\n");
}

function formatFieldValue(field, rawValue) {
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

async function handleSubmit(event) {
  event.preventDefault();
  setStatus("");
  clearValidationErrors();

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

  const formData = new FormData(form);
  formData.set("product_name", hiddenProductName.value);
  formData.set("product_category", hiddenProductCategory.value);
  formData.set("quote_type", hiddenQuoteType.value);
  formData.set("product_image_url", hiddenProductImageUrl.value);
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
    const selectedProductId = state.currentProduct.id;
    form.reset();
    selectProduct(selectedProductId);
  } catch (error) {
    setStatus("The request did not send. Try again in a moment or contact Lignum Artifex directly from the main site.", true);
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Quote Request";
  }
}

function validateForm() {
  let isValid = true;

  const controls = Array.from(form.elements).filter((element) => {
    if (!(element instanceof HTMLElement)) return false;
    if (!("name" in element)) return false;
    if (element.disabled) return false;
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

function resolveAbsoluteUrl(path) {
  return new URL(path, window.location.href).toString();
}
