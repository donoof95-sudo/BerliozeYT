const SHEET_ID = "1uhOMr_5kwoOB8krFZlhgvhcGA4W1kjagj8SMjg4ye8w";
const SHEET_GID = "0";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
const AUTO_REFRESH_MS = 5 * 60 * 1000;

const COUNTRY_CONFIG = [
    { key: "europe", label: "Europe", currency: "EUR", rateTokens: null },
    { key: "usa", label: "USA", currency: "USD", rateTokens: ["usd", "usa"] },
    { key: "philippines", label: "Philippines", currency: "PHP", rateTokens: ["php", "philippines"] },
    { key: "australia", label: "Australie", currency: "AUD", rateTokens: ["aud", "australie"] },
    { key: "canada", label: "Canada", currency: "CAD", rateTokens: ["cad", "canada"] },
    { key: "taiwan", label: "Taiwan", currency: "TWD", rateTokens: ["twd", "taiwan"] }
];

const PRODUCTS = [
    { name: "Ticket I", image: "img/ticket 1.webp", europe: 0.99, usa: 0.99, philippines: 49, australia: 1.49, canada: 1.39, taiwan: 33 },
    { name: "Ticket II", image: "img/ticket 2.webp", europe: 1.99, usa: 1.99, philippines: 119, australia: 2.99, canada: 2.79, taiwan: 70 },
    { name: "Ticket III", image: "img/ticket 3.webp", europe: 2.99, usa: 2.99, philippines: 179, australia: 4.49, canada: 3.99, taiwan: 100 },
    { name: "Ticket IV", image: "img/ticket 4.webp", europe: 4.99, usa: 4.99, philippines: 299, australia: 7.99, canada: 6.99, taiwan: 170 },
    { name: "Ticket V", image: "img/ticket 5.webp", europe: 9.99, usa: 9.99, philippines: 599, australia: 14.99, canada: 13.99, taiwan: 330 },
    { name: "Ticket VI", image: "img/ticket 6.webp", europe: 19.99, usa: 19.99, philippines: 1190, australia: 29.99, canada: 27.99, taiwan: 670 },
    { name: "Ticket VII", image: "img/ticket 7.webp", europe: 49.99, usa: 49.99, philippines: 2990, australia: 79.99, canada: 69.99, taiwan: 1690 },
    { name: "Ticket VIII", image: "img/ticket 8.webp", europe: 99.99, usa: 99.99, philippines: 5990, australia: 149.99, canada: 139.99, taiwan: 3290 },
    { name: "Pièces du dragon x12", image: "img/pièces-12.webp", europe: 0.99, usa: 0.99, philippines: 49, australia: 1.49, canada: 1.39, taiwan: 33 },
    { name: "Pièces du dragon x24", image: "img/pièces-24.webp", europe: 1.99, usa: 1.99, philippines: 119, australia: 2.99, canada: 2.79, taiwan: 70 },
    { name: "Pièces du dragon x36", image: "img/pièces-36.webp", europe: 2.99, usa: 2.99, philippines: 179, australia: 4.49, canada: 3.99, taiwan: 100 },
    { name: "Pièces du dragon x60", image: "img/pièces-60.webp", europe: 4.99, usa: 4.99, philippines: 299, australia: 7.99, canada: 6.99, taiwan: 170 },
    { name: "Pièces du dragon x120", image: "img/pièces-120.webp", europe: 9.99, usa: 9.99, philippines: 599, australia: 14.99, canada: 13.99, taiwan: 330 },
    { name: "Pièces du dragon x240", image: "img/pièces-240.webp", europe: 19.99, usa: 19.99, philippines: 1190, australia: 29.99, canada: 27.99, taiwan: 670 }
];

const EXTRA_PRODUCTS = [
    { name: "Pack tickets III x7", image: "img/pack ticket dragons 3 - pack de 7.webp", europe: 20.93, usa: 20.93, philippines: 1250, australia: 32.99, canada: 28.99, taiwan: 690 },
    { name: "Pack tickets III x14", image: "img/pack ticket dragons 3 - pack de 14.webp", europe: 41.86, usa: 41.86, philippines: 2510, australia: 65.99, canada: 57.99, taiwan: 1390 },
    { name: "Pack tickets III x30", image: "img/pack ticket dragons 3 - pack de 30.webp", europe: 89.70, usa: 89.97, philippines: 5390, australia: 139.99, canada: 119.99, taiwan: 2990 },
    { name: "Pack de base tickets", image: "img/OFFRES~2.WEB", description: "Ticket IV x1, Ticket V x1, Ticket VI x1 + Piece du dragon x35", europe: 34.97, usa: 34.97, philippines: 2088.8, australia: 53.97, canada: 48.97, taiwan: 1120 },
    { name: "Offre spéciale avancée", image: "img/OFFRES~1.WEB", description: "Ticket IV x1, Ticket V x1, Ticket VI x1, Ticket VII x1, Ticket VIII x1 + Piece du dragon x185", europe: 184.95, usa: 184.95, philippines: 11090, australia: 282.95, canada: 258.95, taiwan: 6150 },
    { name: "Super offre spéciale tickets", image: "img/SUPERO~1.WEB", description: "Ticket IV x1, Ticket V x1, Ticket VI x1, Ticket VII x1, Ticket VIII x3 + Piece du dragon x385", europe: 384.93, usa: 384.93, philippines: 23090, australia: 582.93, canada: 538.93, taiwan: 12730 }
];

const ALL_PRODUCTS = [...PRODUCTS, ...EXTRA_PRODUCTS];

const table = document.getElementById("pricing-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");
const tableFoot = table.querySelector("tfoot");
const mobileTable = document.getElementById("pricing-table-mobile");
const mobileTableHead = mobileTable.querySelector("thead");
const mobileTableBody = mobileTable.querySelector("tbody");
const mobileTableFoot = mobileTable.querySelector("tfoot");
const statusElement = document.getElementById("table-status");
const mobilePricingList = document.getElementById("mobile-pricing-list");
const tableWrap = document.querySelector(".desktop-table-wrap");
const stickyHead = document.getElementById("pricing-table-sticky-head");
const mobileTableToggle = document.getElementById("mobile-table-toggle");
const mobileTableDrawer = document.getElementById("mobile-table-drawer");
const mobileTableClose = document.getElementById("mobile-table-close");
const mobileTableBackdrop = document.getElementById("mobile-table-backdrop");

function isCompactLayout() {
    return window.getComputedStyle(tableWrap).display === "none";
}

function setMobileDrawerOpen(isOpen) {
    if (!mobileTableDrawer || !mobileTableToggle || !mobileTableBackdrop) {
        return;
    }

    const shouldOpen = isOpen && isCompactLayout();
    mobileTableDrawer.classList.toggle("is-open", shouldOpen);
    mobileTableDrawer.setAttribute("aria-hidden", String(!shouldOpen));
    mobileTableToggle.setAttribute("aria-expanded", String(shouldOpen));
    mobileTableBackdrop.hidden = !shouldOpen;
    document.body.classList.toggle("mobile-drawer-open", shouldOpen);
}

function syncStickyHeader() {
    if (!stickyHead || !tableWrap || !tableHead.children.length) {
        return;
    }

    const sourceHeaderRow = tableHead.querySelector("tr");
    if (!sourceHeaderRow) {
        stickyHead.innerHTML = "";
        stickyHead.classList.remove("is-visible");
        return;
    }

    const sourceCells = Array.from(sourceHeaderRow.children);
    const tableWidth = table.offsetWidth;
    const visibleWidth = tableWrap.clientWidth;

    stickyHead.innerHTML = `
        <table aria-hidden="true">
            <thead>${tableHead.innerHTML}</thead>
        </table>
    `;

    const stickyTable = stickyHead.querySelector("table");
    const stickyCells = stickyHead.querySelectorAll("th");

    stickyHead.style.width = `${visibleWidth}px`;
    stickyHead.style.maxWidth = `${visibleWidth}px`;
    stickyTable.style.width = `${tableWidth}px`;

    sourceCells.forEach((cell, index) => {
        const width = cell.getBoundingClientRect().width;
        const stickyCell = stickyCells[index];

        if (stickyCell) {
            stickyCell.style.width = `${width}px`;
            stickyCell.style.minWidth = `${width}px`;
            stickyCell.style.maxWidth = `${width}px`;
        }
    });

    stickyTable.style.transform = `translateX(-${tableWrap.scrollLeft}px)`;
}

function handleStickyHeaderVisibility() {
    if (!stickyHead || !tableWrap || !tableHead.children.length) {
        return;
    }

    const wrapRect = tableWrap.getBoundingClientRect();
    const footRect = tableFoot.getBoundingClientRect();
    const stickyHeight = stickyHead.getBoundingClientRect().height;
    const shouldShow = wrapRect.top <= 10 && footRect.top > stickyHeight + 24;

    stickyHead.classList.toggle("is-visible", shouldShow);
}

function setupStickyHeader() {
    if (!stickyHead || !tableWrap || isCompactLayout()) {
        if (stickyHead) {
            stickyHead.innerHTML = "";
            stickyHead.classList.remove("is-visible");
        }
        return;
    }

    syncStickyHeader();
    handleStickyHeaderVisibility();
}

function renderMobilePricing(rates) {
    if (!mobilePricingList) {
        return;
    }

    mobilePricingList.innerHTML = ALL_PRODUCTS.map((product) => {
        const computedValues = COUNTRY_CONFIG.map((country) => {
            if (country.key === "europe") {
                return {
                    label: country.label,
                    value: product.europe,
                    display: formatEuro(product.europe),
                    valid: true
                };
            }

            const localPrice = product[country.key];
            const rate = rates[country.key];

            if (!Number.isFinite(localPrice) || !Number.isFinite(rate) || rate === 0) {
                return {
                    label: country.label,
                    value: Number.NaN,
                    display: "-",
                    valid: false
                };
            }

            const euroValue = localPrice / rate;
            return {
                label: country.label,
                value: euroValue,
                display: formatEuro(euroValue),
                valid: true
            };
        });

        const bestValue = computedValues
            .filter((item) => item.valid)
            .sort((firstItem, secondItem) => firstItem.value - secondItem.value)[0];

        const imageMarkup = product.image
            ? `<img class="mobile-product-image" src="${product.image}" alt="${product.name}">`
            : "";

        return `
            <article class="mobile-pricing-row">
                <div class="mobile-pricing-product">
                    ${imageMarkup}
                    <div class="mobile-pricing-copy">
                        <span class="mobile-pricing-name">${product.name}</span>
                        ${product.description ? `<span class="mobile-pricing-description">${product.description}</span>` : ""}
                    </div>
                </div>
                <div class="mobile-pricing-best">
                    <span class="mobile-pricing-country">${bestValue ? bestValue.label : "-"}</span>
                    <strong class="mobile-pricing-price">${bestValue ? bestValue.display : "-"}</strong>
                </div>
            </article>
        `;
    }).join("");
}

function renderFullTable(targetHead, targetBody, targetFoot, rates) {
    targetHead.innerHTML = `
        <tr>
            <th scope="col">Produit</th>
            ${COUNTRY_CONFIG.map((country) => `<th scope="col">${country.label}</th>`).join("")}
        </tr>
    `;

    targetBody.innerHTML = ALL_PRODUCTS.map((product) => {
        const computedValues = COUNTRY_CONFIG.map((country) => {
            if (country.key === "europe") {
                return {
                    countryKey: country.key,
                    value: product.europe,
                    display: formatEuro(product.europe),
                    valid: true
                };
            }

            const localPrice = product[country.key];
            const rate = rates[country.key];

            if (!Number.isFinite(localPrice) || !Number.isFinite(rate) || rate === 0) {
                return {
                    countryKey: country.key,
                    value: Number.NaN,
                    display: "-",
                    valid: false
                };
            }

            const euroValue = localPrice / rate;
            return {
                countryKey: country.key,
                value: euroValue,
                display: formatEuro(euroValue),
                valid: true
            };
        });

        const validValues = computedValues.filter((item) => item.valid);
        const lowestValue = validValues.length > 0
            ? Math.min(...validValues.map((item) => item.value))
            : Number.NaN;

        const cells = computedValues.map((item) => {
            const isBestPrice = item.valid && Math.abs(item.value - lowestValue) < 0.0001;
            const className = isBestPrice ? "best-price" : "";
            return `<td class="${className}">${item.display}</td>`;
        }).join("");

        const imageMarkup = product.image
            ? `<img class="product-ticket-image" src="${product.image}" alt="${product.name}">`
            : "";

        return `
            <tr>
                <th scope="row">
                    <div class="product-label">
                        ${imageMarkup}
                        <div class="product-copy">
                            <span class="product-name">${product.name}</span>
                            ${product.description ? `<span class="product-description">${product.description}</span>` : ""}
                        </div>
                    </div>
                </th>
                ${cells}
            </tr>
        `;
    }).join("");

    targetFoot.innerHTML = `
        <tr class="rates-row">
            <th scope="row">Taux utilisÃ©s</th>
            ${COUNTRY_CONFIG.map((country) => {
                const rate = rates[country.key];

                if (!Number.isFinite(rate) || rate === 0) {
                    return `<td>-</td>`;
                }

                return `<td>1 EUR = ${formatRate(rate)} ${country.currency}</td>`;
            }).join("")}
        </tr>
    `;
}

function parseCsv(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = "";
    let insideQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
        const char = text[index];
        const nextChar = text[index + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                currentCell += '"';
                index += 1;
            } else {
                insideQuotes = !insideQuotes;
            }
            continue;
        }

        if (char === "," && !insideQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !insideQuotes) {
            if (char === "\r" && nextChar === "\n") {
                index += 1;
            }

            currentRow.push(currentCell.trim());
            rows.push(currentRow);
            currentRow = [];
            currentCell = "";
            continue;
        }

        currentCell += char;
    }

    if (currentCell.length > 0 || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }

    return rows;
}

function parseFrenchNumber(value) {
    if (!value) {
        return Number.NaN;
    }

    const normalized = value.replace(/\s/g, "").replace(",", ".");
    return Number.parseFloat(normalized);
}

function formatEuro(value) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

function formatRate(value) {
    return new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
    }).format(value);
}

function normalizeHeader(value) {
    return (value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function extractRates(rows) {
    const [headerRow, rateRow] = rows;

    return COUNTRY_CONFIG.reduce((rates, country) => {
        if (!country.rateTokens) {
            rates[country.key] = 1;
            return rates;
        }

        const rateIndex = headerRow.findIndex((cell) => {
            const normalizedHeader = normalizeHeader(cell);
            return country.rateTokens.every((token) => normalizedHeader.includes(token));
        });

        rates[country.key] = rateIndex >= 0 ? parseFrenchNumber(rateRow?.[rateIndex]) : Number.NaN;
        return rates;
    }, {});
}

function renderTable(rates) {
    tableHead.innerHTML = `
        <tr>
            <th scope="col">Produit</th>
            ${COUNTRY_CONFIG.map((country) => `<th scope="col">${country.label}</th>`).join("")}
        </tr>
    `;

    tableBody.innerHTML = ALL_PRODUCTS.map((product) => {
        const computedValues = COUNTRY_CONFIG.map((country) => {
            if (country.key === "europe") {
                return {
                    countryKey: country.key,
                    value: product.europe,
                    display: formatEuro(product.europe),
                    valid: true
                };
            }

            const localPrice = product[country.key];
            const rate = rates[country.key];

            if (!Number.isFinite(localPrice) || !Number.isFinite(rate) || rate === 0) {
                return {
                    countryKey: country.key,
                    value: Number.NaN,
                    display: "-",
                    valid: false
                };
            }

            const euroValue = localPrice / rate;
            return {
                countryKey: country.key,
                value: euroValue,
                display: formatEuro(euroValue),
                valid: true
            };
        });

        const validValues = computedValues.filter((item) => item.valid);
        const lowestValue = validValues.length > 0
            ? Math.min(...validValues.map((item) => item.value))
            : Number.NaN;

        const cells = computedValues.map((item) => {
            const isBestPrice = item.valid && Math.abs(item.value - lowestValue) < 0.0001;
            const className = isBestPrice ? "best-price" : "";
            return `<td class="${className}">${item.display}</td>`;
        }).join("");

        const imageMarkup = product.image
            ? `<img class="product-ticket-image" src="${product.image}" alt="${product.name}">`
            : "";

        return `
            <tr>
                <th scope="row">
                    <div class="product-label">
                        ${imageMarkup}
                        <div class="product-copy">
                            <span class="product-name">${product.name}</span>
                            ${product.description ? `<span class="product-description">${product.description}</span>` : ""}
                        </div>
                    </div>
                </th>
                ${cells}
            </tr>
        `;
    }).join("");

    tableFoot.innerHTML = `
        <tr class="rates-row">
            <th scope="row">Taux utilisés</th>
            ${COUNTRY_CONFIG.map((country) => {
                const rate = rates[country.key];

                if (!Number.isFinite(rate) || rate === 0) {
                    return `<td>-</td>`;
                }

                return `<td>1 EUR = ${formatRate(rate)} ${country.currency}</td>`;
            }).join("")}
        </tr>
    `;

    mobileTableHead.innerHTML = tableHead.innerHTML;
    mobileTableBody.innerHTML = tableBody.innerHTML;
    mobileTableFoot.innerHTML = tableFoot.innerHTML;

    const missingRateCountries = COUNTRY_CONFIG
        .filter((country) => country.key !== "europe" && !Number.isFinite(rates[country.key]))
        .map((country) => country.label);

    if (missingRateCountries.length > 0) {
        statusElement.textContent = `Prix finaux en euros calculés avec les taux de change. Taux manquant pour : ${missingRateCountries.join(", ")}.`;
        renderMobilePricing(rates);
        setupStickyHeader();
        return;
    }

    statusElement.textContent = "Prix finaux en euros calculés à partir des prix locaux et des taux de change.";
    renderMobilePricing(rates);
    setupStickyHeader();
}

async function loadSheetRates() {
    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const csvText = await response.text();
        const rows = parseCsv(csvText).filter((row) => row.some((cell) => cell.trim() !== ""));

        if (rows.length < 2) {
            throw new Error("La feuille ne contient pas la ligne de taux.");
        }

        const rates = extractRates(rows);
        renderTable(rates);
    } catch (error) {
        statusElement.textContent = "Impossible de charger la sheet. Les taux de change n'ont pas pu etre récuperés.";
        tableHead.innerHTML = "";
        tableBody.innerHTML = `
            <tr>
                <td colspan="${COUNTRY_CONFIG.length + 1}">
                    Le tableau n'a pas pu etre calculé car la ligne 2 de la Google Sheet est inaccessible.
                </td>
            </tr>
        `;
        tableFoot.innerHTML = "";
        mobileTableHead.innerHTML = "";
        mobileTableBody.innerHTML = "";
        mobileTableFoot.innerHTML = "";
        if (mobilePricingList) {
            mobilePricingList.innerHTML = "";
        }
        setMobileDrawerOpen(false);
        if (stickyHead) {
            stickyHead.innerHTML = "";
            stickyHead.classList.remove("is-visible");
        }
        console.error("Erreur lors du chargement des taux :", error);
    }
}

loadSheetRates();
window.setInterval(loadSheetRates, AUTO_REFRESH_MS);

if (tableWrap) {
    tableWrap.addEventListener("scroll", () => {
        const stickyTable = stickyHead?.querySelector("table");
        if (stickyTable) {
            stickyTable.style.transform = `translateX(-${tableWrap.scrollLeft}px)`;
        }
    });
}

window.addEventListener("scroll", handleStickyHeaderVisibility, { passive: true });
window.addEventListener("resize", () => {
    setMobileDrawerOpen(false);
    setupStickyHeader();
});

if (mobileTableToggle) {
    mobileTableToggle.addEventListener("click", () => {
        setMobileDrawerOpen(true);
    });
}

if (mobileTableClose) {
    mobileTableClose.addEventListener("click", () => {
        setMobileDrawerOpen(false);
    });
}

if (mobileTableBackdrop) {
    mobileTableBackdrop.addEventListener("click", () => {
        setMobileDrawerOpen(false);
    });
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMobileDrawerOpen(false);
    }
});
