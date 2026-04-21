/**
 * jQuery & AJAX Summary Website
 * ใช้ jQuery + AJAX ในการโหลดข้อมูลจาก JSON files และแสดงผลทั้งหมด
 */

$(document).ready(function () {
  // ===== Global State =====
  const state = {
    loadedTabs: {},
    totalSections: 0,
    totalMethods: 0,
    totalExamples: 0,
  };

  // ===== Initialize App =====
  initNavbar();
  initTabs();
  initBackToTop();
  initGlobalAjaxEvents();

  // Load first tab
  loadTabContent("jquery-basics");

  // ===== Navbar =====
  function initNavbar() {
    // Scroll effect
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $(".navbar").addClass("scrolled");
      } else {
        $(".navbar").removeClass("scrolled");
      }
    });

    // Mobile menu toggle
    $(".menu-toggle").click(function () {
      $(".nav-links").toggleClass("open");
      const icon = $(this);
      icon.text(icon.text() === "☰" ? "✕" : "☰");
    });

    // Nav link click
    $(".nav-links a").click(function (e) {
      e.preventDefault();
      $(".nav-links a").removeClass("active");
      $(this).addClass("active");
      $(".nav-links").removeClass("open");
      $(".menu-toggle").text("☰");

      const tabId = $(this).data("tab");
      if (tabId) {
        switchTab(tabId);
      }
    });
  }

  // ===== Tabs =====
  function initTabs() {
    $(".tab-btn").click(function () {
      const tabId = $(this).data("tab");
      switchTab(tabId);
    });
  }

  function switchTab(tabId) {
    // Update tab buttons
    $(".tab-btn").removeClass("active");
    $(`.tab-btn[data-tab="${tabId}"]`).addClass("active");

    // Update nav links
    $(".nav-links a").removeClass("active");
    $(`.nav-links a[data-tab="${tabId}"]`).addClass("active");

    // Switch content
    $(".tab-content").removeClass("active");
    $(`#${tabId}`).addClass("active");

    // Load content if not loaded
    if (!state.loadedTabs[tabId]) {
      loadTabContent(tabId);
    }

    // Smooth scroll to top of tabs
    $("html, body").animate(
      { scrollTop: $(".tab-container").offset().top - 90 },
      400
    );
  }

  // ===== AJAX Content Loading =====
  function loadTabContent(tabId) {
    const fileMap = {
      "jquery-basics": "jquery-basics.json",
      "ajax-guide": "ajax-guide.json",
      "practical-examples": "practical-examples.json",
      cheatsheet: "cheatsheet.json",
    };

    const url = fileMap[tabId];
    if (!url) return;

    // Show loading spinner
    $(`#${tabId} .tab-body`).html(`
      <div class="loading-container">
        <div class="spinner"></div>
        <div class="loading-text">กำลังโหลดข้อมูลด้วย AJAX...</div>
      </div>
    `);

    // ===== AJAX Request =====
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      beforeSend: function () {
        showToast("📡 กำลังส่ง AJAX GET Request...", "info");
      },
      success: function (data) {
        // Delay a tiny bit to show loading effect
        setTimeout(function () {
          renderContent(tabId, data);
          state.loadedTabs[tabId] = true;
          showToast(`✅ โหลด "${data.title}" สำเร็จ!`, "success");
          updateStats();
        }, 400);
      },
      error: function (xhr, status, error) {
        $(`#${tabId} .tab-body`).html(`
          <div class="loading-container">
            <div style="font-size:2.5rem; margin-bottom:8px;">⚠️</div>
            <div class="loading-text">ไม่สามารถโหลดข้อมูลได้: ${error}</div>
            <button class="demo-btn" onclick="location.reload()" style="margin-top:12px;">ลองใหม่</button>
          </div>
        `);
        showToast(`❌ เกิดข้อผิดพลาด: ${error}`, "error");
      },
    });
  }

  // ===== Render Content =====
  function renderContent(tabId, data) {
    if (tabId === "cheatsheet") {
      renderCheatsheet(tabId, data);
    } else {
      renderSections(tabId, data);
    }
  }

  function renderSections(tabId, data) {
    let html = `
      <div class="section-header">
        <h2>${data.icon} ${data.title}</h2>
        <p>${data.description}</p>
      </div>
      <div class="content-grid">
    `;

    $.each(data.sections, function (index, section) {
      const highlighted = highlightSyntax(section.code);
      html += `
        <div class="content-card" id="${section.id}" style="animation-delay: ${index * 0.08}s">
          <div class="card-header">
            <h3>
              <span class="card-number">${index + 1}</span>
              ${section.title}
            </h3>
          </div>
          <div class="card-body">
            <div class="description">${section.content}</div>
            <div class="code-wrapper">
              <div class="code-block">
                <div class="code-block-header">
                  <span class="code-lang">${section.language || "javascript"}</span>
                  <button class="copy-btn" data-code="${encodeURIComponent(section.code)}">
                    📋 Copy
                  </button>
                </div>
                <div class="code-body">
                  <pre>${highlighted}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      state.totalSections++;
      state.totalExamples++;
    });

    html += "</div>";

    // Add live demo for jquery-basics
    if (tabId === "jquery-basics") {
      html += renderLiveDemo();
    }

    $(`#${tabId} .tab-body`).html(html);

    // Animate cards in
    $(`#${tabId} .content-card`).each(function (i) {
      $(this)
        .css({ opacity: 0, transform: "translateY(20px)" })
        .delay(i * 80)
        .animate({ opacity: 1 }, 300)
        .css("transform", "translateY(0)");
    });

    // Copy button handler
    bindCopyButtons();
  }

  function renderCheatsheet(tabId, data) {
    let html = `
      <div class="section-header">
        <h2>${data.icon} ${data.title}</h2>
        <p>${data.description}</p>
      </div>
      <div class="cheatsheet-grid">
    `;

    $.each(data.categories, function (index, cat) {
      html += `
        <div class="cheat-category" style="animation-delay: ${index * 0.08}s">
          <div class="cheat-category-header">
            <span class="cheat-category-dot" style="background: ${cat.color};"></span>
            <h3>${cat.name}</h3>
          </div>
      `;

      $.each(cat.items, function (i, item) {
        html += `
          <div class="cheat-item">
            <span class="cheat-method">${escapeHtml(item.method)}</span>
            <span class="cheat-desc">${item.desc}</span>
          </div>
        `;
        state.totalMethods++;
      });

      html += "</div>";
    });

    html += "</div>";
    $(`#${tabId} .tab-body`).html(html);

    // Animate cards
    $(`#${tabId} .cheat-category`).each(function (i) {
      $(this)
        .css({ opacity: 0, transform: "translateY(20px)" })
        .delay(i * 80)
        .animate({ opacity: 1 }, 300)
        .css("transform", "translateY(0)");
    });
  }

  // ===== Live Demo =====
  function renderLiveDemo() {
    return `
      <div class="demo-panel">
        <h3>🎮 Live Demo — ลองเล่นจริง!</h3>
        <p class="demo-subtitle">กดปุ่มด้านล่างเพื่อดู jQuery ทำงานจริงบนหน้าเว็บนี้</p>
        <div class="demo-grid">
          <div class="demo-card">
            <h4>Effects — Show/Hide</h4>
            <button class="demo-btn" id="demo-toggle-btn">👁️ Toggle Box</button>
            <div id="demo-box"></div>
          </div>
          <div class="demo-card">
            <h4>CSS — เปลี่ยนสี</h4>
            <button class="demo-btn green" id="demo-color-btn">🎨 สุ่มสี</button>
            <div class="demo-target" id="demo-color-target">กดปุ่มเพื่อเปลี่ยนสีกล่อง</div>
          </div>
          <div class="demo-card">
            <h4>DOM — เพิ่ม Element</h4>
            <button class="demo-btn orange" id="demo-add-btn">➕ เพิ่ม Item</button>
            <div class="demo-target" id="demo-list" style="flex-direction:column; gap:4px; align-items:stretch;"></div>
          </div>
          <div class="demo-card">
            <h4>Animation — เคลื่อน</h4>
            <button class="demo-btn pink" id="demo-animate-btn">🚀 Animate</button>
            <div class="demo-target">
              <div id="demo-animate-box" style="width:40px;height:40px;background:var(--accent-pink);border-radius:8px;position:relative;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Bind demo interactions using event delegation
  $(document).on("click", "#demo-toggle-btn", function () {
    $("#demo-box").slideToggle(400);
  });

  $(document).on("click", "#demo-color-btn", function () {
    const colors = [
      "linear-gradient(135deg, #7c6cff, #3b82f6)",
      "linear-gradient(135deg, #f472b6, #fb923c)",
      "linear-gradient(135deg, #34d399, #22d3ee)",
      "linear-gradient(135deg, #f87171, #fbbf24)",
      "linear-gradient(135deg, #8b5cf6, #ec4899)",
      "linear-gradient(135deg, #06b6d4, #3b82f6)",
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    if ($("#demo-box").length) {
      $("#demo-box").css("background", random);
    }
    $("#demo-color-target")
      .text("✅ สีถูกเปลี่ยนแล้ว!")
      .css("color", "var(--accent-green)");
    setTimeout(() => {
      $("#demo-color-target")
        .text("กดปุ่มเพื่อเปลี่ยนสีกล่อง")
        .css("color", "var(--text-secondary)");
    }, 1500);
  });

  let itemCount = 0;
  $(document).on("click", "#demo-add-btn", function () {
    itemCount++;
    const item = $(
      `<div style="background:rgba(251,146,60,0.1);border:1px solid rgba(251,146,60,0.2);padding:8px 14px;border-radius:8px;font-size:0.85rem;display:flex;justify-content:space-between;align-items:center;">
        <span>📦 Item #${itemCount} — สร้างด้วย .append()</span>
        <button class="remove-item" style="background:none;border:none;color:var(--accent-red);cursor:pointer;font-size:1rem;">✕</button>
      </div>`
    );
    item.hide();
    $("#demo-list").append(item);
    item.slideDown(300);
  });

  $(document).on("click", ".remove-item", function () {
    $(this)
      .parent()
      .slideUp(300, function () {
        $(this).remove();
      });
  });

  $(document).on("click", "#demo-animate-btn", function () {
    $("#demo-animate-box").animate(
      {
        left: "+=60px",
        width: "toggle",
      },
      400,
      function () {
        $(this).animate(
          {
            left: "0px",
            width: "40px",
          },
          400
        );
      }
    );
  });

  // ===== Syntax Highlighting =====
  function highlightSyntax(code) {
    let html = escapeHtml(code);

    // Comments (// ...)
    html = html.replace(
      /(\/\/[^\n]*)/g,
      '<span class=comment>$1</span>'
    );

    // Strings (single + double quotes)
    html = html.replace(
      /'([^']*?)'/g,
      '<span class=string>\'$1\'</span>'
    );
    html = html.replace(
      /"([^"]*?)"/g,
      '<span class=string>"$1"</span>'
    );

    // Keywords
    const keywords = [
      "function",
      "const",
      "let",
      "var",
      "return",
      "if",
      "else",
      "new",
      "true",
      "false",
      "null",
      "undefined",
      "typeof",
    ];
    keywords.forEach(function (kw) {
      const re = new RegExp("\\b(" + kw + ")\\b", "g");
      html = html.replace(re, '<span class=keyword>$1</span>');
    });

    // jQuery $ sign
    html = html.replace(
      /(\$)(\(|\.)/g,
      '<span class=jquery>$1</span>$2'
    );

    // Numbers
    html = html.replace(
      /\b(\d+)\b/g,
      '<span class=number>$1</span>'
    );

    // Methods .method()
    html = html.replace(
      /\.([a-zA-Z_]\w*)(\()/g,
      '.<span class=method>$1</span>$2'
    );

    return html;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ===== Copy Button =====
  function bindCopyButtons() {
    $(".copy-btn")
      .off("click")
      .on("click", function () {
        const code = decodeURIComponent($(this).data("code"));
        const btn = $(this);

        navigator.clipboard
          .writeText(code)
          .then(function () {
            btn.addClass("copied").html("✅ Copied!");
            setTimeout(function () {
              btn.removeClass("copied").html("📋 Copy");
            }, 2000);
          })
          .catch(function () {
            // Fallback
            const textarea = $("<textarea>")
              .val(code)
              .css({ position: "fixed", left: "-9999px" })
              .appendTo("body");
            textarea[0].select();
            document.execCommand("copy");
            textarea.remove();
            btn.addClass("copied").html("✅ Copied!");
            setTimeout(function () {
              btn.removeClass("copied").html("📋 Copy");
            }, 2000);
          });
      });
  }

  // ===== Toast Notification =====
  function showToast(message, type) {
    const toast = $("#ajax-toast");
    const html = `<span>${message}</span><button type="button" class="toast-close" aria-label="Close">&times;</button>`;
    
    toast.removeClass("success error show").html(html);
    toast.addClass(type + " show");

    toast.off("click", ".toast-close").on("click", ".toast-close", function() {
      toast.removeClass("show");
      clearTimeout(toast.data("timer"));
    });

    clearTimeout(toast.data("timer"));
    toast.data(
      "timer",
      setTimeout(function () {
        toast.removeClass("show");
      }, 4000)
    );
  }

  // ===== Global AJAX Events =====
  function initGlobalAjaxEvents() {
    $(document)
      .ajaxStart(function () {
        // Could show global loader here
      })
      .ajaxStop(function () {
        // all requests completed
      })
      .ajaxError(function (event, xhr, settings) {
        console.error("AJAX Error on:", settings.url);
      });
  }

  // ===== Back to Top =====
  function initBackToTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 400) {
        $(".back-to-top").addClass("visible");
      } else {
        $(".back-to-top").removeClass("visible");
      }
    });

    $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 500);
    });
  }

  // ===== Update Stats =====
  function updateStats() {
    const loaded = Object.keys(state.loadedTabs).length;
    $("#stat-sections").text(state.totalSections || "—");
    $("#stat-examples").text(state.totalExamples || "—");
    $("#stat-loaded").text(loaded + "/4");
  }
});
