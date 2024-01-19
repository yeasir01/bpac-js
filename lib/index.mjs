// src/bpac.js
var n = n || {};
n.appendMessage = (n2) => {
  const t2 = new CustomEvent("bpac_send", { detail: n2 });
  document.dispatchEvent(t2);
};
var t = "Can't connect to b-PAC";
var IObject = class {
  constructor(n2) {
    this.p_ = n2;
  }
  GetAttribute(i) {
    const r = "IObject::GetAttribute", u = { method: r, p: this.p_, kind: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : f2.detail.ret == false ? n2() : n2(f2.detail.attribute);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  GetData(i) {
    const r = "IObject::GetData", u = { method: r, p: this.p_, kind: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : f2.detail.ret == false ? n2() : n2(f2.detail.data);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  GetFontBold() {
    const i = "IObject::GetFontBold", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetFontEffect() {
    const i = "IObject::GetFontEffect", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.effect);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetFontItalics() {
    const i = "IObject::GetFontItalics", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetFontMaxPoint() {
    const i = "IObject::GetFontMaxPoint", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.point);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetFontName() {
    const i = "IObject::GetFontName", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetFontStrikeout() {
    const i = "IObject::GetFontStrikeout", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetFontUnderline() {
    const i = "IObject::GetFontUnderline", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  SetAlign(i, r) {
    const u = "IObject::SetAlign", f = { method: u, p: this.p_, horizontal: i, vertical: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  SetAttribute(i, r) {
    const u = "IObject::SetAttribute", f = { method: u, p: this.p_, kind: i, attribute: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  SetData(i, r, u) {
    let e;
    const o = Object.prototype.toString.call(r).slice(8, -1);
    e = o === "Date" ? r.getTime() / 1e3 : r;
    const f = "IObject::SetData", s = { method: f, p: this.p_, kind: i, data: e, param: u }, h = new Promise((n2, i2) => {
      const r2 = (u2) => {
        document.removeEventListener(f, r2), u2.detail.connect == false ? i2(t) : n2(u2.detail.ret);
      };
      document.addEventListener(f, r2);
    });
    return n.appendMessage(s), h;
  }
  SetFontBold(i) {
    const r = "IObject::SetFontBold", u = { method: r, p: this.p_, bold: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetFontEffect(i) {
    const r = "IObject::SetFontEffect", u = { method: r, p: this.p_, effect: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetFontItalics(i) {
    const r = "IObject::SetFontItalics", u = { method: r, p: this.p_, italics: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetFontMaxPoint(i) {
    const r = "IObject::SetFontMaxPoint", u = { method: r, p: this.p_, point: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetFontName(i) {
    const r = "IObject::SetFontName", u = { method: r, p: this.p_, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetFontStrikeout(i) {
    const r = "IObject::SetFontStrikeout", u = { method: r, p: this.p_, strikeout: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetFontUnderline(i) {
    const r = "IObject::SetFontUnderline", u = { method: r, p: this.p_, underline: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  SetPosition(i, r, u, f) {
    const e = "IObject::SetPosition", o = { method: e, p: this.p_, x: i, y: r, width: u, height: f }, s = new Promise((n2, i2) => {
      const r2 = (u2) => {
        document.removeEventListener(e, r2), u2.detail.connect == false ? i2(t) : n2(u2.detail.ret);
      };
      document.addEventListener(e, r2);
    });
    return n.appendMessage(o), s;
  }
  SetSelection(i, r) {
    const u = "IObject::SetPosition", f = { method: u, p: this.p_, start: i, end: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  get Height() {
    const i = "IObject::GetHeight", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.height);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set Height(t2) {
    const i = { method: "IObject::SetHeight", p: this.p_, height: t2 };
    n.appendMessage(i);
  }
  get HorizontalAlign() {
    const i = "IObject::GetHorizontalAlign", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.align);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set HorizontalAlign(t2) {
    const i = {
      method: "IObject::SetHorizontalAlign",
      p: this.p_,
      align: t2
    };
    n.appendMessage(i);
  }
  get Name() {
    const i = "IObject::GetName", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set Name(t2) {
    const i = { method: "IObject::SetName", p: this.p_, name: t2 };
    n.appendMessage(i);
  }
  get Orientation() {
    const i = "IObject::GetOrientation", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.orientation);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set Orientation(t2) {
    const i = {
      method: "IObject::SetOrientation",
      p: this.p_,
      orientation: t2
    };
    n.appendMessage(i);
  }
  get SelectionEnd() {
    const i = "IObject::GetSelectionEnd", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.selection);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set SelectionEnd(t2) {
    const i = {
      method: "IObject::SetSelectionEnd",
      p: this.p_,
      selection: t2
    };
    n.appendMessage(i);
  }
  get SelectionStart() {
    const i = "IObject::GetSelectionStart", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.selection);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set SelectionStart(t2) {
    const i = {
      method: "IObject::SetSelectionStart",
      p: this.p_,
      selection: t2
    };
    n.appendMessage(i);
  }
  get Text() {
    const i = "IObject::GetText", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.text);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set Text(t2) {
    const i = { method: "IObject::SetText", p: this.p_, text: t2 };
    n.appendMessage(i);
  }
  get Type() {
    const i = "IObject::GetType", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.type);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  get VerticalAlign() {
    const i = "IObject::GetVerticalAlign", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.align);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set VerticalAlign(t2) {
    const i = { method: "IObject::SetVerticalAlign", p: this.p_, align: t2 };
    n.appendMessage(i);
  }
  get Width() {
    const i = "IObject::GetWidth", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.width);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set Width(t2) {
    const i = { method: "IObject::SetWidth", p: this.p_, width: t2 };
    n.appendMessage(i);
  }
  get X() {
    const i = "IObject::GetX", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.X);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set X(t2) {
    const i = { method: "IObject::SetX", p: this.p_, X: t2 };
    n.appendMessage(i);
  }
  get Y() {
    const i = "IObject::GetY", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.Y);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  set Y(t2) {
    const i = { method: "IObject::SetY", p: this.p_, Y: t2 };
    n.appendMessage(i);
  }
};
var IObjects = class {
  constructor(n2) {
    this.p_ = n2;
  }
  GetItem(i) {
    const r = "IObjects::GetItem", u = { method: r, p: this.p_, index: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        if (document.removeEventListener(r, u2), f2.detail.connect == false)
          i2(t);
        else if (f2.detail.ret == false)
          n2();
        else if (f2.detail.p >= 0) {
          const t2 = new IObject(f2.detail.p);
          n2(t2);
        } else
          i2();
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  GetCount() {
    const i = "IObjects::GetCount", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.count);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetIndex(i) {
    const r = "IObjects::GetIndex", u = { method: r, p: this.p_, obj: i.p_ }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : f2.detail.ret == false ? n2() : n2(f2.detail.index);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  GetIndexByName(i, r) {
    const u = "IObjects::GetIndexByName", f = { method: u, p: this.p_, name: i, indexBgn: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : f2.detail.ret == false ? n2() : n2(f2.detail.index);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  Insert(i, r, u, f, e, o, s) {
    const h = "IObjects::Insert", c = {
      method: h,
      p: this.p_,
      index: i,
      type: r,
      X: u,
      Y: f,
      width: e,
      height: o,
      option: s
    }, l = new Promise((n2, i2) => {
      const r2 = (u2) => {
        if (document.removeEventListener(h, r2), u2.detail.connect == false)
          i2(t);
        else if (u2.detail.ret == false)
          n2();
        else if (u2.detail.p >= 0) {
          const t2 = new IObject(u2.detail.p);
          n2(t2);
        } else
          i2();
      };
      document.addEventListener(h, r2);
    });
    return n.appendMessage(c), l;
  }
  Remove(i) {
    const r = "IObjects::Remove", u = { method: r, p: this.p_, index: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  get Count() {
    return this.GetCount();
  }
};
var IPrinter = class {
  constructor(n2) {
    this.p_ = n2;
  }
  GetInstalledPrinters() {
    const i = "IPrinter::GetInstalledPrinters", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.printers);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetMediaId() {
    const i = "IPrinter::GetMediaId", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.id);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetMediaName() {
    const i = "IPrinter::GetMediaName", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetPrintedTapeLength() {
    const i = "IPrinter::GetPrintedTapeLength", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.length);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetSupportedMediaIds() {
    const i = "IPrinter::GetSupportedMediaIds", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.mediaIds);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  GetSupportedMediaNames() {
    const i = "IPrinter::GetSupportedMediaNames", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.mediaNames);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  IsMediaIdSupported(i) {
    const r = "IPrinter::IsMediaIdSupported", u = { method: r, p: this.p_, id: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  IsMediaNameSupported(i) {
    const r = "IPrinter::IsMediaNameSupported", u = { method: r, p: this.p_, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  IsPrinterOnline(i) {
    const r = "IPrinter::IsPrinterOnline", u = { method: r, p: this.p_, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  IsPrinterSupported(i) {
    const r = "IPrinter::IsPrinterSupported", u = { method: r, p: this.p_, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  get ErrorCode() {
    const i = "IPrinter::GetErrorCode", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.errorCode);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  get ErrorString() {
    const i = "IPrinter::GetErrorString", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.errorString);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  get Name() {
    const i = "IPrinter::GetName", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  get PortName() {
    const i = "IPrinter::GetPortName", r = { method: i, p: this.p_ }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.port);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
};
var IDocument = class _IDocument {
  static get Width() {
    return _IDocument.GetWidth();
  }
  static get Length() {
    return _IDocument.GetLength();
  }
  static set Length(n2) {
    _IDocument.SetLength(n2);
  }
  static get CurrentSheet() {
    return _IDocument.GetCurrentSheet();
  }
  static set CurrentSheet(n2) {
    _IDocument.SetCurrentSheet(n2);
  }
  static get CutLineCount() {
    return _IDocument.GetCutLineCount();
  }
  static get CutLines() {
    return _IDocument.GetCutLines();
  }
  static get ErrorCode() {
    return _IDocument.GetErrorCode();
  }
  static get MarginBottom() {
    return _IDocument.GetMarginBottom();
  }
  static set MarginBottom(n2) {
    return _IDocument.SetMarginBottom(n2);
  }
  static get MarginLeft() {
    return _IDocument.GetMarginLeft();
  }
  static set MarginLeft(n2) {
    return _IDocument.SetMarginLeft(n2);
  }
  static get MarginRight() {
    return _IDocument.GetMarginRight();
  }
  static set MarginRight(n2) {
    return _IDocument.SetMarginRight(n2);
  }
  static get MarginTop() {
    return _IDocument.GetMarginTop();
  }
  static set MarginTop(n2) {
    return _IDocument.SetMarginTop(n2);
  }
  static get Objects() {
    return _IDocument.GetObjects();
  }
  static get Orientation() {
    return _IDocument.GetOrientation();
  }
  static get Printer() {
    return _IDocument.GetPrinter();
  }
  static get SheetNames() {
    return _IDocument.GetSheetNames();
  }
  static Open(i) {
    const r = "IDocument::Open", u = { method: r, filePath: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static DoPrint(i, r) {
    const u = "IDocument::DoPrint", f = { method: u, dwOption: i, szOption: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static StartPrint(i, r) {
    const u = "IDocument::StartPrint", f = { method: u, docName: i, option: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static PrintOut(i, r) {
    const u = "IDocument::PrintOut", f = { method: u, copyCount: i, option: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static EndPrint() {
    const i = "IDocument::EndPrint", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetImageData(i, r, u) {
    const f = "IDocument::GetImageData", e = { method: f, type: i, width: r, height: u }, o = new Promise((n2, i2) => {
      const r2 = (u2) => {
        document.removeEventListener(f, r2), u2.detail.ret == true && u2.detail.connect == true ? n2(u2.detail.image) : i2(t);
      };
      document.addEventListener(f, r2);
    });
    return n.appendMessage(e), o;
  }
  static GetObjectsCount() {
    const i = "IDocument::GetObjectsCount", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == true && f.detail.connect == true ? n2(f.detail.count) : r2(t);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetIndexByName(i, r) {
    const u = "IDocument::GetIndexByName", f = { method: u, name: i, indexBgn: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : f2.detail.ret == true ? n2(f2.detail.index) : n2();
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static GetObject(i) {
    const r = "IDocument::GetObject", u = { method: r, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        if (document.removeEventListener(r, u2), f2.detail.connect == false)
          i2(t);
        else if (f2.detail.ret == false)
          n2();
        else if (f2.detail.p >= 0) {
          const t2 = new IObject(f2.detail.p);
          n2(t2);
        } else
          i2();
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetObjects(i) {
    const r = "IDocument::GetObjects", u = { method: r, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        if (document.removeEventListener(r, u2), f2.detail.ret == false || f2.detail.connect == false)
          i2(t);
        else if (f2.detail.p >= 0) {
          const t2 = new IObjects(f2.detail.p);
          n2(t2);
        } else
          i2();
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetBarcodeIndex(i) {
    const r = "IDocument::GetBarcodeIndex", u = { method: r, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : f2.detail.ret == false ? n2() : n2(f2.detail.index);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetMediaId() {
    const i = "IDocument::GetMediaId", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.id);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetMediaName() {
    const i = "IDocument::GetMediaName", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetPrinterName() {
    const i = "IDocument::GetPrinterName", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetText(i) {
    const r = "IDocument::GetText", u = { method: r, index: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.ret == false || f2.detail.connect == false ? i2(t) : n2(f2.detail.text);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetTextCount() {
    const i = "IDocument::GetTextCount", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.count);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetTextIndex(i) {
    const r = "IDocument::GetTextIndex", u = { method: r, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : f2.detail.ret == false ? n2() : n2(f2.detail.index);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetPrinter() {
    const i = "IDocument::GetPrinter", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        if (document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false)
          r2(t);
        else if (f.detail.p >= 0) {
          const t2 = new IPrinter(f.detail.p);
          n2(t2);
        } else
          r2();
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetText(i, r) {
    const u = "IDocument::SetText", f = { method: u, index: i, text: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static SetBarcodeData(i, r) {
    const u = "IDocument::SetBarcodeData", f = { method: u, index: i, text: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static SetMarginLeftRight(i, r) {
    const u = "IDocument::SetMarginLeftRight", f = { method: u, left: i, right: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static SetMediaById(i, r) {
    const u = "IDocument::SetMediaById", f = { method: u, id: i, fit: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static SetMediaByName(i, r) {
    const u = "IDocument::SetMediaByName", f = { method: u, name: i, fit: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static SetPrinter(i, r) {
    const u = "IDocument::SetPrinter", f = { method: u, name: i, fit: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static GetCurrentSheet() {
    const i = "IDocument::GetCurrentSheet", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.name);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetCurrentSheet(i) {
    const r = "IDocument::SetCurrentSheet", u = { method: r, name: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetCutLineCount() {
    const i = "IDocument::GetCutLineCount", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.count);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetCutLines() {
    const i = "IDocument::GetCutLines", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : f.detail.ret == false ? n2() : n2(f.detail.cutlines);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetErrorCode() {
    const i = "IDocument::GetErrorCode", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.errorCode);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetMarginBottom() {
    const i = "IDocument::GetMarginBottom", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.margin);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetMarginBottom(i) {
    const r = "IDocument::SetMarginBottom", u = { method: r, margin: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetMarginLeft() {
    const i = "IDocument::GetMarginLeft", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.margin);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetMarginLeft(i) {
    const r = "IDocument::SetMarginLeft", u = { method: r, margin: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetMarginRight() {
    const i = "IDocument::GetMarginRight", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.margin);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetMarginRight(i) {
    const r = "IDocument::SetMarginRight", u = { method: r, margin: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetMarginTop() {
    const i = "IDocument::GetMarginTop", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.margin);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetMarginTop(i) {
    const r = "IDocument::SetMarginTop", u = { method: r, margin: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false || f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static GetOrientation() {
    const i = "IDocument::GetOrientation", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.orientation);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetSheetNames() {
    const i = "IDocument::GetSheetNames", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.names);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetWidth() {
    const i = "IDocument::GetWidth", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.width);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static GetLength() {
    const i = "IDocument::GetLength", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.ret == false || f.detail.connect == false ? r2(t) : n2(f.detail.length);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SetLength(i) {
    const r = "IDocument::SetLength", u = { method: r, length: i }, f = new Promise((n2, i2) => {
      const u2 = (f2) => {
        document.removeEventListener(r, u2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(r, u2);
    });
    return n.appendMessage(u), f;
  }
  static Save() {
    const i = "IDocument::Save", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
  static SaveAs(i, r) {
    const u = "IDocument::SaveAs", f = { method: u, type: i, filePath: r }, e = new Promise((n2, i2) => {
      const r2 = (f2) => {
        document.removeEventListener(u, r2), f2.detail.connect == false ? i2(t) : n2(f2.detail.ret);
      };
      document.addEventListener(u, r2);
    });
    return n.appendMessage(f), e;
  }
  static Export(i, r, u) {
    const f = "IDocument::Export", e = { method: f, type: i, filePath: r, dpi: u }, o = new Promise((n2, i2) => {
      const r2 = (u2) => {
        document.removeEventListener(f, r2), u2.detail.connect == false ? i2(t) : n2(u2.detail.ret);
      };
      document.addEventListener(f, r2);
    });
    return n.appendMessage(e), o;
  }
  static Close() {
    const i = "IDocument::Close", r = { method: i }, u = new Promise((n2, r2) => {
      const u2 = (f) => {
        document.removeEventListener(i, u2), f.detail.connect == false ? r2(t) : n2(f.detail.ret);
      };
      document.addEventListener(i, u2);
    });
    return n.appendMessage(r), u;
  }
};

// src/index.ts
var doc = IDocument;
var fileType = Object.freeze({
  default: 1,
  lbx: 1,
  lbl: 2,
  lbi: 3,
  bmp: 4,
  paf: 5
});
var objectType = Object.freeze({
  TEXT: 0,
  BARCODE: 1,
  IMAGE: 2,
  DATETIME: 3,
  CLIPART: 4
});
var printQuality = Object.freeze({
  default: 0,
  fastPrint: 16777216,
  highQuality: 33554432
});
var getAbsolutePath = (basePath, filePathOrFileName) => {
  const isPath = /^(.*[\\\/])([^\\\/]+)\.([^.]+)$/;
  if (!isPath.test(filePathOrFileName)) {
    if (!basePath) {
      throw Error("Please set exportDir or provide the full path.");
    }
    return basePath + filePathOrFileName;
  }
  return filePathOrFileName;
};
var open = async (path) => {
  try {
    const isOpen = await doc.Open(path);
    return isOpen;
  } catch (_e) {
    await doc.Close();
    throw new Error(
      "Failed to open template file, please check path and try again."
    );
  }
};
var populateObjects = async (data) => {
  const props = Object.keys(data);
  for (const prop of props) {
    const value = data[prop];
    const obj = await doc.GetObject(prop);
    if (!obj) {
      await doc.Close();
      throw new Error(
        `The "${prop}" object does not exist in the template.`
      );
    }
    const type = await obj.Type;
    switch (type) {
      case objectType.TEXT:
        obj.Text = value;
        break;
      case objectType.IMAGE:
        await obj.SetData(0, value, 4);
        break;
      case objectType.DATETIME:
        await obj.SetData(0, value);
        break;
      case objectType.BARCODE:
        await doc.SetBarcodeData(0, value);
        break;
      case objectType.CLIPART:
        await obj.SetData(0, value, 0);
        break;
      default:
        throw new Error(`Invalid type for "${prop}" prop.`);
    }
  }
  return true;
};
var BrotherSdk = class {
  ready;
  templatePath;
  exportDir;
  /**
   * Constructor for the BrotherSdk class.
   * @constructor
   * @param {Object} options
   * Configuration options.
   * @param {String} options.templatePath
   * Path (UNC) or URL to the template file Can be specified
   * as \\your_server\your_folder\your_file for a file on a
   * file-sharing server Can be specified as http://your_server/your_file
   * for a template file URL.
   * @param {String} options.exportDir
   * The path for exporting generated templates.
   */
  constructor({ templatePath, exportDir }) {
    this.ready = false;
    this.templatePath = templatePath;
    this.exportDir = exportDir;
    this.#initialize(4e3);
  }
  #initialize(timeout) {
    const targetNode = document.body;
    const className = "bpac-extension-installed";
    if (targetNode.classList.contains(className)) {
      this.ready = true;
      return;
    }
    let observer;
    let timeoutId;
    const cleanup = () => {
      if (timeoutId !== void 0) {
        clearTimeout(timeoutId);
      }
    };
    observer = new MutationObserver(() => {
      if (targetNode.classList.contains(className)) {
        this.ready = true;
        observer?.disconnect();
        cleanup();
      }
    });
    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ["class"]
    });
    timeoutId = setTimeout(() => {
      console.error(
        "The b-PAC extension may not be installed or active."
      );
      cleanup();
    }, timeout);
  }
  /**
   * @param {object} data
   * An object containing key-value pairs, where each key represents an object ID,
   * and the corresponding value is the text to be set on that object.
   * @param {object} config
   * Configuration options
   * @param {number} config.copies
   * The number of copies to be printed.
   * @param {string} config.printName
   * The name of the document to be printed.
   * @param {keyof printQuality} config.quality
   * Print quality.
   * @returns {boolean}
   * A promise that resolves with a boolean.
   */
  async print(data, config) {
    const copies = config?.copies || 1;
    const printName = config?.printName || "BPAC-Document";
    const printOpt = printQuality[config?.quality || "default"];
    await open(this.templatePath);
    await populateObjects(data);
    await doc.StartPrint(printName, printOpt);
    await doc.PrintOut(copies, 0);
    await doc.EndPrint();
    await doc.Close();
    return true;
  }
  /**
   * @param {object} data
   * An object containing key-value pairs, where each key represents an object ID,
   * and the corresponding value is the text to be set on that object.
   * @param {object} opts
   * Config options.
   * @param {string} opts.height
   * If the vertical size (pixel) of the image to be acquired is specified as 0, it
   * becomes a size that maintains the aspect ratio based on width.
   * @param {string} opts.width
   * Horizontal size (pixel) of the image to be acquired. If 0 is specified,
   * it becomes a size that maintains the aspect ratio based on height.
   * @returns {Promise<string>}
   * returns a base64 string.
   */
  async getImageData(data, opts) {
    const height = opts?.height || 0;
    const width = opts?.width || 0;
    await open(this.templatePath);
    await populateObjects(data);
    const base64Data = await doc.GetImageData(4, width, height);
    await doc.Close();
    return `${base64Data}`;
  }
  /**
   * Asynchronously retrieves a list of installed printers compatible with the SDK.
   * @returns {Promise<string[]>}
   * A promise that resolves to an array of strings representing
   * the names of installed printers compatible with the 'bpac' SDK.
   * @throws {Error}
   * If there's an issue while retrieving the printer list.
   *
   */
  static async getPrinterList() {
    const printObj = await doc.GetPrinter();
    const printers = await printObj.GetInstalledPrinters();
    return printers;
  }
  /**
   * Asynchronously retrieves the name of currently selected printer for the instance.
   *
   * @returns {Promise<string>} A promise that resolves to a strings representing
   * the name of the installed printer.
   * @throws {Error} If there's an issue while retrieving the printer list.
   *
   */
  async getPrinterName() {
    await open(this.templatePath);
    const printer = await doc.GetPrinterName();
    await doc.Close();
    return printer;
  }
  /**
   * Asynchronously exports a file.
   * @param {object} data
   * An object containing key-value pairs, where each key represents
   * an object ID, and the corresponding value is the text to be set on that object.
   * @param {string} filePathOrFileName
   *  Path or file name with extension. If initiated with:
   *  - Full path (e.g., 'C:/Users/YourName/Desktop/Exported Labels/cool-label.lbx')
   *  - Only file name with extension (e.g., 'cool-label.lbx').
   * @param {keyof fileType} encoding
   * File encoding type.
   *  - default: Same type as the currently open template.
   *  - lbx: LBX file type.
   *  - lbl: P-touch Editor 4.2 (older format).
   *  - lbi: LBI file type.
   *  - bmp: BMP (monochrome).
   *  - paf: PAF file type.
   * @param {number} resolution
   *  Resolution in dpi used for the conversion into bitmap format.
   *  Specifies the resolution of the output device.
   *  (Screen: 72 or 96; output to SC-2000: 600)
   *  If a value of 0 is specified, the printer resolution is used.
   *  Encoding is only valid for LBI format and BMP format.
   * @returns {Promise<boolean>}
   * A Promise that resolves to a boolean indicating the export status.
   * @throws {Error}
   * If an invalid encoding is supplied to the export method.
   */
  async export(data = {}, filePathOrFileName = "", encoding = "default", resolution = 0) {
    const encodingType = fileType[encoding || "default"];
    if (Number.isNaN(encodingType)) {
      throw new Error(
        `Invalid encoding type. Expected (${Object.keys(fileType).join(
          " | "
        )}) received "${encoding}"`
      );
    }
    const destinationPath = getAbsolutePath(
      this.exportDir,
      filePathOrFileName
    );
    await open(this.templatePath);
    await populateObjects(data);
    const status = await doc.Export(
      encodingType,
      destinationPath,
      resolution
    );
    await doc.Close();
    return status;
  }
};
var src_default = BrotherSdk;
export {
  src_default as default
};
