# ⚡ jQuery & AJAX Summary

https://khone3.github.io/jQuery/

เว็บไซต์สรุปเนื้อหา **jQuery** และ **AJAX** แบบครบถ้วน พร้อมตัวอย่างโค้ดจริง — สร้างขึ้นด้วย jQuery + AJAX จริง ๆ ทุกข้อมูลถูกโหลดจาก JSON files ผ่าน AJAX

## 🌟 Features

- **jQuery Basics** — Selectors, DOM Manipulation, CSS, Events, Effects & Animations
- **AJAX Guide** — GET/POST, Shorthand Methods, Callbacks/Promises, Global Events
- **ตัวอย่างจริง** — Form Validation, Infinite Scroll, Live Search, CRUD, File Upload
- **Cheatsheet** — Quick Reference รวม Methods ที่ใช้บ่อยทั้งหมด
- **Live Demo** — ทดลองใช้ jQuery จริง ๆ บนหน้าเว็บ (Toggle, Animation, DOM, CSS)
- **Syntax Highlighting** — โค้ดถูก highlight อย่างสวยงาม
- **Copy to Clipboard** — คัดลอกโค้ดได้ง่าย ๆ
- **AJAX Toast** — แสดงสถานะ AJAX request แบบ real-time
- **Responsive Design** — รองรับทุกขนาดหน้าจอ

## 🏗️ Project Structure

```text
jQuery/
├── index.html
├── style.css
├── app.js
├── jquery-basics.json
├── ajax-guide.json
├── practical-examples.json
├── cheatsheet.json
└── README.md
```

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| **jQuery 3.7.1** | DOM Manipulation, Events, Effects, AJAX |
| **AJAX ($.ajax)** | โหลดข้อมูลจาก JSON files |
| **Vanilla CSS** | Design system, Glassmorphism, Animations |
| **Google Fonts** | Inter + JetBrains Mono |

## 🚀 How It Works

เว็บนี้ใช้ **jQuery + AJAX** ในการทำงานจริง:

1. **Tab System** — เมื่อคลิก Tab, jQuery จะ switch content
2. **AJAX Loading** — เนื้อหาทุก Tab ถูกโหลดจาก JSON files ด้วย `$.ajax()`
3. **Dynamic Rendering** — ข้อมูลที่ได้ถูก render เป็น HTML ด้วย jQuery DOM manipulation
4. **Live Demo** — แสดง jQuery effects จริง ๆ (toggle, animate, css, append)
5. **Toast Notification** — แจ้งสถานะ AJAX request ทุกครั้ง

## 📚 สรุปคำสั่งพื้นฐานและการจัดการ DOM ของ jQuery (Core Commands)

นอกจาก AJAX แล้ว jQuery ยังเป็นเครื่องมือที่ทรงพลังในการจัดการโครงสร้างหน้าเว็บ (DOM) โดยมีกลุ่มคำสั่งหลักที่ใช้บ่อยดังนี้:

### 1. Selectors (การเลือก Element)
ทำงานคล้ายกับ CSS Selectors แต่มีประสิทธิภาพมากกว่า
```javascript
$('#myId')       // เลือกผ่าย ID
$('.myClass')    // เลือกผ่าน Class
$('div')         // เลือกผ่านชื่อ HTML Tag
$('input:text')  // เลือก Input ประเภท Text
$('ul li:first') // เลือก li ตัวแรกที่อยู่ใน ul
```

### 2. DOM Manipulation (การจัดการเนื้อหา/แท็ก HTML)
คำสั่งสำหรับดึงค่า หรือแก้ไขเนื้อหาบนเว็บ
```javascript
// ดึงหรือเปลี่ยนข้อความ (ไม่สน HTML tag)
let text = $('#box').text(); 
$('#box').text('ข้อความใหม่');

// ดึงหรือเปลี่ยนโครงสร้าง HTML
$('#box').html('<strong>ตัวหนา</strong>');

// ดึงหรือเปลี่ยนค่าของ Input (Form)
let val = $('#username').val();
$('#username').val('john_doe');

// การเพิ่มหรือลบ Element
$('#list').append('<li>ต่อท้าย</li>');    // ใส่ไว้ท้ายสุด (ในกล่อง)
$('#list').prepend('<li>บนสุด</li>');     // ใส่ไว้บนสุด (ในกล่อง)
$('#box').remove();                      // ลบกล่องนี้ทิ้งไปเลย
$('#box').empty();                       // ลบ "ไส้ใน" ของกล่องนี้ทิ้ง แต่เก็บกล่องไว้
```

### 3. CSS & Classes (การจัดการสไตล์)
ใช้สำหรับจัดรูปแบบดีไซน์แบบ Dynamic
```javascript
// เปลี่ยน CSS โดยตรง (ใช้ CamelCase หรือใส่เครื่องหมายขีดคั่น)
$('#box').css('color', 'red');
$('#box').css({
  'background-color': 'blue',
  'font-size': '20px'
});

// จัดการผ่าน Class (แนะนำวิธีนี้)
$('#box').addClass('active');      // เพิ่ม Class
$('#box').removeClass('active');   // ลบ Class
$('#box').toggleClass('active');   // สลับ Class (มีอยู่แล้วลบ, ไม่มีจะเพิ่ม)
```

### 4. Events (การจัดการการกระทำของผู้ใช้)
ดักจับว่าผู้ใช้ทำอะไรกับหน้าเว็บ
```javascript
// รอจนกว่าหน้าเว็บจะโหลดเสร็จสมบูรณ์ (สำคัญ!)
$(document).ready(function() { ... });

// Shorthand ของ .ready() โค้ดสั้นกว่า
$(function() { ... });

// เมื่อถูกคลิก
$('#btn').click(function() {
  alert('ปุ่มถูกคลิก!');
});

// ฟังชั่น .on() (ดีที่สุดสำหรับ Event) ดักจับได้หลาย Event พร้อมกัน
$('#box').on('mouseenter mouseleave', function() {
  $(this).toggleClass('hovered');
});

// ใช้กับ Element ที่ถูกสร้างขึ้นมาใหม่ (Dynamic Element) ต้องใช้ .on() แปะที่ body
$('body').on('click', '.dynamic-btn', function() { ... });
```

### 5. Effects & Animations (ลูกเล่นและแอนิเมชัน)
สร้าง Motion ให้เว็บดูมีชีวิตชีวา
```javascript
// โชว์/ซ่อน แแบบปกติ
$('#box').hide();
$('#box').show();
$('#box').toggle();

// เฟดเข้า/ออก (ค่อยๆ สว่าง/ค่อยๆ จางหาย)
$('#box').fadeIn(500);    // 500ms
$('#box').fadeOut();
$('#box').fadeToggle();

// เลื่อนขึ้น/ลง (เหมือนม่าน)
$('#panel').slideDown();
$('#panel').slideUp();
$('#panel').slideToggle();

// สร้าง Animation ของตัวเอง (ทำงานกับค่าที่เป้นตัวเลขเท่านั้น)
$('#box').animate({
  opacity: 0.5,
  left: '200px',
  height: 'toggle'
}, "slow");
```

### 6. Traversing (การค้นหาเครือญาติใน DOM tree)
เดินหา Element รอบๆ ตัวที่สนใจ
```javascript
// หาพ่อแม่
$('#child').parent();          // ขึ้นไป 1 ระดับ
$('#child').closest('.box');   // ขึ้นไปเรื่อยๆ จนกว่าจะเจอ Class .box

// หาบรรดาลูกๆ
$('#parent').children();       // ลูกสายตรงทุกตัว
$('#parent').find('.target');  // มุดลงไปหาเรื่อยๆ จนกว่าจะเจอ .target

// หาพี่น้องระดับเดียวกัน
$('#item').siblings();         // พี่น้องทั้งหมด (ไม่รวมตัวเอง)
$('#item').next();             // ตัวถัดไป 1 ตัว
$('#item').prev();             // ตัวก่อนหน้า 1 ตัว
```

---

การใช้ AJAX ใน jQuery ช่วยลดความซับซ้อนของการตั้งค่า `XMLHttpRequest` หรือการเรียกใช้ API ปกติ ให้คุณเขียนโค้ดได้กระชับขึ้นด้วย methods ต่างๆ ดังนี้:

### 1. `$.ajax()` (ยืดหยุ่นและปรับแต่งได้มากที่สุด)
ฟังก์ชันหลักของ AJAX ใน jQuery ที่คุณสามารถปรับแต่ง Headers, Method หรือการตั้งค่าเชิงลึกอื่นๆ ได้ทั้งหมด

```javascript
$.ajax({
  url: 'https://api.example.com/data', // URL ปลายทาง
  type: 'POST',                        // HTTP Method: GET, POST, PUT, DELETE
  data: { name: "Somchai", age: 25 },  // ข้อมูลที่จะส่ง (Payload)
  dataType: 'json',                    // ชนิดของข้อมูลที่คาดว่าจะได้รับกลับมา
  beforeSend: function() {
    // เหตุการณ์ทำงาน "ก่อน" ส่ง request (เหมาะสำหรับโชว์ Loading)
    $('#loader').show();
  },
  success: function(response) {
    // เหตุการณ์ทำงาน "เมื่อโหลดสำเร็จ"
    console.log("ได้กระทำสำเร็จ:", response);
  },
  error: function(xhr, status, error) {
    // เหตุการณ์ทำงาน "เมื่อทมีข้อผิดพลาดเกิดขึ้น"
    console.error("เกิดข้อผิดพลาด:", error);
  },
  complete: function() {
    // ทำงานเสมอในตอนท้าย (ไม่ว่าจะสำเร็จหรือพังก็ตาม)
    $('#loader').hide();
  }
});
```

### 2. `$.get()` (ดึงข้อมูลอย่างงาย)
Shorthand method สำหรับรับข้อมูลด่วน (ทำหน้าที่เป็น `GET` request)

```javascript
$.get('https://api.example.com/users', function(data) {
  // เมื่อได้ข้อมูลมาแล้วให้นำไปแสดง
  console.log("ได้รับผู้ใช้งานทั้งหมด:", data);
});
```

### 3. `$.post()` (ส่งข้อมูลอย่างง่าย)
Shorthand method สำหรับส่งข้อมูลสั้นๆ (ทำหน้าที่เป็น `POST` request) โดยไม่ต้องรำคาญตั้งค่า Content-Type

```javascript
// ส่งข้อมูล name, role ไปยัง url ปลายทาง และรับ response กลับมา
$.post('https://api.example.com/users', { name: "John", role: "Admin" }, function(response) {
  alert("สร้างผู้ใช้ใหม่สำเร็จ! ID: " + response.id);
});
```

### 4. `$.getJSON()` (โหลดเฉพาะไฟล์ JSON)
ใช้เฉพาะเมื่อคุณรู้ว่า Server จะส่งกลับมาเป็น .json แน่ๆ (ดีตรงที่จะแปลง JSON String เป็น Object ให้ทันทีเลย)

```javascript
$.getJSON('users.json', function(data) {
  // วนลูปข้อมูลผู้ใช้แล้วเพิ่มเข้าหน้าเว็บ
  $.each(data, function(index, user) {
    $('#user-list').append('<li>' + user.name + '</li>');
  });
});
```

### 5. `.load()` (โหลดข้อมูล HTML มาใส่ใน Element)
Method ที่ดีที่สุดในการทำ UI Component แยกร่างและดึงมาแทรกตามจุดต่างๆ โค้ดจะดึงหน้าเว็บปลายทางมาเทใส่ `<div id="content">` ให้เลย

```javascript
// ดึงหน้า about.html มายัดใส่ใน id="content" ทันที
$('#content').load('about.html');

// แอดวานซ์: โหลดเฉพาะส่วนที่ต้องการ (ดึงแง่มุมเฉพาะ <div id="info"> จากไฟล์อื่นมาใส่)
$('#content').load('about.html #info');
```

### 6. Global AJAX Events (ดักจับ AJAX ทุกตัว)
ใช้ผูก event ระดับ Global ช่วยให้ไม่ต้องเขียนคำสั่งโชว์ Loading เดิมๆ เพื่อซ่อนเปิดทุกๆ ตัว `$.ajax()` แต่ทำให้มีผลครอบคลุมทั้งหน้าเว็บ

```javascript
$(document)
  .ajaxStart(function() {
    // เมื่อมี AJAX ใดๆ เริ่มต้น (และไม่มี AJAX อื่นทำงานอยู่) ให้โชว์คำว่า Loading
    $('#global-loader').fadeIn();
  })
  .ajaxStop(function() {
    // เมื่อ AJAX ทั้งหน้าเว็บทำงานเสร็จหมดจดแล้ว ให้ซ่อน Loading
    $('#global-loader').fadeOut();
  })
  .ajaxError(function(event, jqxhr, settings, thrownError) {
    // โชว์แจ้งเตือนถ้า AJAX ใดพัง
    alert("การเชื่อมต่อระบบมีปัญหาที่ " + settings.url);
  });
```

## 📝 License

MIT License — ใช้เพื่อการเรียนรู้ได้อย่างอิสระ
