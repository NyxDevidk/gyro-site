(function () {
  var RELEASE = {
    version: "1.0.0",
    size: "2,82 MB",
    sha256: "30b817e13f5ad46f4c3ef112ad274718f5669856541f0a47a265cdc35c3aeab8",
    url: "https://github.com/NyxDevidk/GyroClient-releases/releases/latest/download/GyroLoader.exe",
    manifest: "https://github.com/NyxDevidk/GyroClient-releases/releases/latest/download/manifest.json",
    github: "https://github.com/NyxDevidk/GyroClient-releases",
    discord: ""
  };

  function render() {
    document.querySelectorAll("[data-download]").forEach(function (a) {
      a.href = RELEASE.url;
      a.setAttribute("download", "GyroLoader.exe");
    });
    var set = function (field, text) {
      var el = document.querySelector('[data-field="' + field + '"]');
      if (el) el.textContent = text;
    };
    set("version", "v" + RELEASE.version);
    set("size", RELEASE.size);
    var sha = document.getElementById("sha-value");
    if (sha) sha.textContent = RELEASE.sha256;
  }

  function setLink(id, href) {
    var a = document.getElementById(id);
    if (!a) return;
    if (href) { a.href = href; } else { a.parentElement.hidden = true; }
  }

  render();
  setLink("github-link", RELEASE.github);
  setLink("discord-link", RELEASE.discord);

  fetch(RELEASE.manifest)
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (m) {
      if (!m) return;
      if (m.version) RELEASE.version = String(m.version).replace(/^v/, "");
      if (m.loader_sha256) RELEASE.sha256 = m.loader_sha256;
      if (m.size) RELEASE.size = m.size;
      render();
    })
    .catch(function () {});

  var copy = document.getElementById("copy-sha");
  if (copy) {
    copy.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(RELEASE.sha256).then(function () {
        copy.textContent = "Copied";
        setTimeout(function () { copy.textContent = "Copy"; }, 1500);
      }, function () {});
    });
  }

  // Hide the menu section when the screenshot is not deployed.
  var shot = document.querySelector("#menu img");
  var hideMenu = function () {
    var s = document.getElementById("menu");
    if (s) s.hidden = true;
    var l = document.querySelector('.nav__links a[href="#menu"]');
    if (l && l.parentElement) l.parentElement.hidden = true;
  };
  if (shot) {
    if (shot.complete && shot.naturalWidth === 0) hideMenu();
    shot.addEventListener("error", hideMenu);
  }
})();
