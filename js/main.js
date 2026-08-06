/* A1 Customs PA — shared behavior */

// mobile nav
const burger = document.querySelector(".nav-burger");
const navLinks = document.querySelector(".nav-links");
if (burger) {
  burger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// starfield canvas (hero) — a nod to the starlight headliners
const canvas = document.getElementById("starfield");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  function resize() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    stars = Array.from({ length: Math.min(160, Math.floor(canvas.width / 12)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 1.4 + 0.3) * devicePixelRatio,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.025 + 0.008,
    }));
  }
  resize();
  addEventListener("resize", resize);
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const st of stars) {
      st.p += st.s;
      const a = 0.25 + Math.abs(Math.sin(st.p)) * 0.65;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  })();
}

// gallery lightbox
const lb = document.querySelector(".lightbox");
if (lb) {
  const slot = lb.querySelector(".lb-slot");
  document.querySelectorAll(".g-item").forEach((item) => {
    item.addEventListener("click", () => {
      slot.innerHTML = "";
      const vid = item.dataset.video;
      if (vid) {
        const v = document.createElement("video");
        v.src = vid;
        v.controls = true;
        v.autoplay = true;
        v.muted = false;
        v.playsInline = true;
        slot.appendChild(v);
      } else {
        const img = document.createElement("img");
        img.src = item.dataset.full || item.querySelector("img").src;
        slot.appendChild(img);
      }
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  function closeLb() {
    lb.classList.remove("open");
    slot.innerHTML = "";
    document.body.style.overflow = "";
  }
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) closeLb();
  });
  addEventListener("keydown", (e) => e.key === "Escape" && closeLb());
}

// hover-to-play videos in gallery grid
document.querySelectorAll(".g-item video").forEach((v) => {
  const item = v.closest(".g-item");
  item.addEventListener("mouseenter", () => v.play().catch(() => {}));
  item.addEventListener("mouseleave", () => { v.pause(); });
});
