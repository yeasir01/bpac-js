var n = n || {};
n.appendMessage = (n) => {
    const t = new CustomEvent("bpac_send", { detail: n });
    document.dispatchEvent(t);
};
const t = "Can't connect to b-PAC";
export class IObject {
    constructor(n) {
        this.p_ = n;
    }
    GetAttribute(i) {
        const r = "IObject::GetAttribute",
            u = { method: r, p: this.p_, kind: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.attribute);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    GetData(i) {
        const r = "IObject::GetData",
            u = { method: r, p: this.p_, kind: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.data);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    GetFontBold() {
        const i = "IObject::GetFontBold",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetFontEffect() {
        const i = "IObject::GetFontEffect",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.effect);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetFontItalics() {
        const i = "IObject::GetFontItalics",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetFontMaxPoint() {
        const i = "IObject::GetFontMaxPoint",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.point);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetFontName() {
        const i = "IObject::GetFontName",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetFontStrikeout() {
        const i = "IObject::GetFontStrikeout",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetFontUnderline() {
        const i = "IObject::GetFontUnderline",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    SetAlign(i, r) {
        const u = "IObject::SetAlign",
            f = { method: u, p: this.p_, horizontal: i, vertical: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    SetAttribute(i, r) {
        const u = "IObject::SetAttribute",
            f = { method: u, p: this.p_, kind: i, attribute: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    SetData(i, r, u) {
        let e;
        const o = Object.prototype.toString.call(r).slice(8, -1);
        e = o === "Date" ? r.getTime() / 1e3 : r;
        const f = "IObject::SetData",
            s = { method: f, p: this.p_, kind: i, data: e, param: u },
            h = new Promise((n, i) => {
                const r = (u) => {
                    document.removeEventListener(f, r),
                        u.detail.connect == !1 ? i(t) : n(u.detail.ret);
                };
                document.addEventListener(f, r);
            });
        return n.appendMessage(s), h;
    }
    SetFontBold(i) {
        const r = "IObject::SetFontBold",
            u = { method: r, p: this.p_, bold: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetFontEffect(i) {
        const r = "IObject::SetFontEffect",
            u = { method: r, p: this.p_, effect: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetFontItalics(i) {
        const r = "IObject::SetFontItalics",
            u = { method: r, p: this.p_, italics: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetFontMaxPoint(i) {
        const r = "IObject::SetFontMaxPoint",
            u = { method: r, p: this.p_, point: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetFontName(i) {
        const r = "IObject::SetFontName",
            u = { method: r, p: this.p_, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetFontStrikeout(i) {
        const r = "IObject::SetFontStrikeout",
            u = { method: r, p: this.p_, strikeout: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetFontUnderline(i) {
        const r = "IObject::SetFontUnderline",
            u = { method: r, p: this.p_, underline: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    SetPosition(i, r, u, f) {
        const e = "IObject::SetPosition",
            o = { method: e, p: this.p_, x: i, y: r, width: u, height: f },
            s = new Promise((n, i) => {
                const r = (u) => {
                    document.removeEventListener(e, r),
                        u.detail.connect == !1 ? i(t) : n(u.detail.ret);
                };
                document.addEventListener(e, r);
            });
        return n.appendMessage(o), s;
    }
    SetSelection(i, r) {
        const u = "IObject::SetPosition",
            f = { method: u, p: this.p_, start: i, end: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    get Height() {
        const i = "IObject::GetHeight",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.height);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set Height(t) {
        const i = { method: "IObject::SetHeight", p: this.p_, height: t };
        n.appendMessage(i);
    }
    get HorizontalAlign() {
        const i = "IObject::GetHorizontalAlign",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.align);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set HorizontalAlign(t) {
        const i = {
            method: "IObject::SetHorizontalAlign",
            p: this.p_,
            align: t,
        };
        n.appendMessage(i);
    }
    get Name() {
        const i = "IObject::GetName",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set Name(t) {
        const i = { method: "IObject::SetName", p: this.p_, name: t };
        n.appendMessage(i);
    }
    get Orientation() {
        const i = "IObject::GetOrientation",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.orientation);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set Orientation(t) {
        const i = {
            method: "IObject::SetOrientation",
            p: this.p_,
            orientation: t,
        };
        n.appendMessage(i);
    }
    get SelectionEnd() {
        const i = "IObject::GetSelectionEnd",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.selection);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set SelectionEnd(t) {
        const i = {
            method: "IObject::SetSelectionEnd",
            p: this.p_,
            selection: t,
        };
        n.appendMessage(i);
    }
    get SelectionStart() {
        const i = "IObject::GetSelectionStart",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.selection);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set SelectionStart(t) {
        const i = {
            method: "IObject::SetSelectionStart",
            p: this.p_,
            selection: t,
        };
        n.appendMessage(i);
    }
    get Text() {
        const i = "IObject::GetText",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.text);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set Text(t) {
        const i = { method: "IObject::SetText", p: this.p_, text: t };
        n.appendMessage(i);
    }
    get Type() {
        const i = "IObject::GetType",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.type);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    get VerticalAlign() {
        const i = "IObject::GetVerticalAlign",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.align);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set VerticalAlign(t) {
        const i = { method: "IObject::SetVerticalAlign", p: this.p_, align: t };
        n.appendMessage(i);
    }
    get Width() {
        const i = "IObject::GetWidth",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.width);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set Width(t) {
        const i = { method: "IObject::SetWidth", p: this.p_, width: t };
        n.appendMessage(i);
    }
    get X() {
        const i = "IObject::GetX",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.X);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set X(t) {
        const i = { method: "IObject::SetX", p: this.p_, X: t };
        n.appendMessage(i);
    }
    get Y() {
        const i = "IObject::GetY",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.Y);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    set Y(t) {
        const i = { method: "IObject::SetY", p: this.p_, Y: t };
        n.appendMessage(i);
    }
}
export class IObjects {
    constructor(n) {
        this.p_ = n;
    }
    GetItem(i) {
        const r = "IObjects::GetItem",
            u = { method: r, p: this.p_, index: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    if (
                        (document.removeEventListener(r, u),
                        f.detail.connect == !1)
                    )
                        i(t);
                    else if (f.detail.ret == !1) n();
                    else if (f.detail.p >= 0) {
                        const t = new IObject(f.detail.p);
                        n(t);
                    } else i();
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    GetCount() {
        const i = "IObjects::GetCount",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.count);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetIndex(i) {
        const r = "IObjects::GetIndex",
            u = { method: r, p: this.p_, obj: i.p_ },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.index);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    GetIndexByName(i, r) {
        const u = "IObjects::GetIndexByName",
            f = { method: u, p: this.p_, name: i, indexBgn: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.index);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    Insert(i, r, u, f, e, o, s) {
        const h = "IObjects::Insert",
            c = {
                method: h,
                p: this.p_,
                index: i,
                type: r,
                X: u,
                Y: f,
                width: e,
                height: o,
                option: s,
            },
            l = new Promise((n, i) => {
                const r = (u) => {
                    if (
                        (document.removeEventListener(h, r),
                        u.detail.connect == !1)
                    )
                        i(t);
                    else if (u.detail.ret == !1) n();
                    else if (u.detail.p >= 0) {
                        const t = new IObject(u.detail.p);
                        n(t);
                    } else i();
                };
                document.addEventListener(h, r);
            });
        return n.appendMessage(c), l;
    }
    Remove(i) {
        const r = "IObjects::Remove",
            u = { method: r, p: this.p_, index: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    get Count() {
        return this.GetCount();
    }
}
export class IPrinter {
    constructor(n) {
        this.p_ = n;
    }
    GetInstalledPrinters() {
        const i = "IPrinter::GetInstalledPrinters",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.printers);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetMediaId() {
        const i = "IPrinter::GetMediaId",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.id);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetMediaName() {
        const i = "IPrinter::GetMediaName",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetPrintedTapeLength() {
        const i = "IPrinter::GetPrintedTapeLength",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.length);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetSupportedMediaIds() {
        const i = "IPrinter::GetSupportedMediaIds",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.mediaIds);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    GetSupportedMediaNames() {
        const i = "IPrinter::GetSupportedMediaNames",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.mediaNames);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    IsMediaIdSupported(i) {
        const r = "IPrinter::IsMediaIdSupported",
            u = { method: r, p: this.p_, id: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    IsMediaNameSupported(i) {
        const r = "IPrinter::IsMediaNameSupported",
            u = { method: r, p: this.p_, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    IsPrinterOnline(i) {
        const r = "IPrinter::IsPrinterOnline",
            u = { method: r, p: this.p_, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    IsPrinterSupported(i) {
        const r = "IPrinter::IsPrinterSupported",
            u = { method: r, p: this.p_, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    get ErrorCode() {
        const i = "IPrinter::GetErrorCode",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.errorCode);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    get ErrorString() {
        const i = "IPrinter::GetErrorString",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.errorString);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    get Name() {
        const i = "IPrinter::GetName",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    get PortName() {
        const i = "IPrinter::GetPortName",
            r = { method: i, p: this.p_ },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.port);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
}
export class IDocument {
    static get Width() {
        return IDocument.GetWidth();
    }
    static get Length() {
        return IDocument.GetLength();
    }
    static set Length(n) {
        IDocument.SetLength(n);
    }
    static get CurrentSheet() {
        return IDocument.GetCurrentSheet();
    }
    static set CurrentSheet(n) {
        IDocument.SetCurrentSheet(n);
    }
    static get CutLineCount() {
        return IDocument.GetCutLineCount();
    }
    static get CutLines() {
        return IDocument.GetCutLines();
    }
    static get ErrorCode() {
        return IDocument.GetErrorCode();
    }
    static get MarginBottom() {
        return IDocument.GetMarginBottom();
    }
    static set MarginBottom(n) {
        return IDocument.SetMarginBottom(n);
    }
    static get MarginLeft() {
        return IDocument.GetMarginLeft();
    }
    static set MarginLeft(n) {
        return IDocument.SetMarginLeft(n);
    }
    static get MarginRight() {
        return IDocument.GetMarginRight();
    }
    static set MarginRight(n) {
        return IDocument.SetMarginRight(n);
    }
    static get MarginTop() {
        return IDocument.GetMarginTop();
    }
    static set MarginTop(n) {
        return IDocument.SetMarginTop(n);
    }
    static get Objects() {
        return IDocument.GetObjects();
    }
    static get Orientation() {
        return IDocument.GetOrientation();
    }
    static get Printer() {
        return IDocument.GetPrinter();
    }
    static get SheetNames() {
        return IDocument.GetSheetNames();
    }
    static Open(i) {
        const r = "IDocument::Open",
            u = { method: r, filePath: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static DoPrint(i, r) {
        const u = "IDocument::DoPrint",
            f = { method: u, dwOption: i, szOption: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static StartPrint(i, r) {
        const u = "IDocument::StartPrint",
            f = { method: u, docName: i, option: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static PrintOut(i, r) {
        const u = "IDocument::PrintOut",
            f = { method: u, copyCount: i, option: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static EndPrint() {
        const i = "IDocument::EndPrint",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetImageData(i, r, u) {
        const f = "IDocument::GetImageData",
            e = { method: f, type: i, width: r, height: u },
            o = new Promise((n, i) => {
                const r = (u) => {
                    document.removeEventListener(f, r),
                        u.detail.ret == !0 && u.detail.connect == !0
                            ? n(u.detail.image)
                            : i(t);
                };
                document.addEventListener(f, r);
            });
        return n.appendMessage(e), o;
    }
    static GetObjectsCount() {
        const i = "IDocument::GetObjectsCount",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !0 && f.detail.connect == !0
                            ? n(f.detail.count)
                            : r(t);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetIndexByName(i, r) {
        const u = "IDocument::GetIndexByName",
            f = { method: u, name: i, indexBgn: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !0
                            ? n(f.detail.index)
                            : n();
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static GetObject(i) {
        const r = "IDocument::GetObject",
            u = { method: r, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    if (
                        (document.removeEventListener(r, u),
                        f.detail.connect == !1)
                    )
                        i(t);
                    else if (f.detail.ret == !1) n();
                    else if (f.detail.p >= 0) {
                        const t = new IObject(f.detail.p);
                        n(t);
                    } else i();
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetObjects(i) {
        const r = "IDocument::GetObjects",
            u = { method: r, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    if (
                        (document.removeEventListener(r, u),
                        f.detail.ret == !1 || f.detail.connect == !1)
                    )
                        i(t);
                    else if (f.detail.p >= 0) {
                        const t = new IObjects(f.detail.p);
                        n(t);
                    } else i();
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetBarcodeIndex(i) {
        const r = "IDocument::GetBarcodeIndex",
            u = { method: r, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.index);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetMediaId() {
        const i = "IDocument::GetMediaId",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.id);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetMediaName() {
        const i = "IDocument::GetMediaName",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetPrinterName() {
        const i = "IDocument::GetPrinterName",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetText(i) {
        const r = "IDocument::GetText",
            u = { method: r, index: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? i(t)
                            : n(f.detail.text);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetTextCount() {
        const i = "IDocument::GetTextCount",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.count);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetTextIndex(i) {
        const r = "IDocument::GetTextIndex",
            u = { method: r, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1
                            ? i(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.index);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetPrinter() {
        const i = "IDocument::GetPrinter",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    if (
                        (document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1)
                    )
                        r(t);
                    else if (f.detail.p >= 0) {
                        const t = new IPrinter(f.detail.p);
                        n(t);
                    } else r();
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetText(i, r) {
        const u = "IDocument::SetText",
            f = { method: u, index: i, text: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static SetBarcodeData(i, r) {
        const u = "IDocument::SetBarcodeData",
            f = { method: u, index: i, text: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static SetMarginLeftRight(i, r) {
        const u = "IDocument::SetMarginLeftRight",
            f = { method: u, left: i, right: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static SetMediaById(i, r) {
        const u = "IDocument::SetMediaById",
            f = { method: u, id: i, fit: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static SetMediaByName(i, r) {
        const u = "IDocument::SetMediaByName",
            f = { method: u, name: i, fit: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static SetPrinter(i, r) {
        const u = "IDocument::SetPrinter",
            f = { method: u, name: i, fit: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static GetCurrentSheet() {
        const i = "IDocument::GetCurrentSheet",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.name);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetCurrentSheet(i) {
        const r = "IDocument::SetCurrentSheet",
            u = { method: r, name: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetCutLineCount() {
        const i = "IDocument::GetCutLineCount",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.count);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetCutLines() {
        const i = "IDocument::GetCutLines",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1
                            ? r(t)
                            : f.detail.ret == !1
                            ? n()
                            : n(f.detail.cutlines);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetErrorCode() {
        const i = "IDocument::GetErrorCode",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.errorCode);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetMarginBottom() {
        const i = "IDocument::GetMarginBottom",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.margin);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetMarginBottom(i) {
        const r = "IDocument::SetMarginBottom",
            u = { method: r, margin: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetMarginLeft() {
        const i = "IDocument::GetMarginLeft",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.margin);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetMarginLeft(i) {
        const r = "IDocument::SetMarginLeft",
            u = { method: r, margin: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetMarginRight() {
        const i = "IDocument::GetMarginRight",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.margin);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetMarginRight(i) {
        const r = "IDocument::SetMarginRight",
            u = { method: r, margin: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetMarginTop() {
        const i = "IDocument::GetMarginTop",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.margin);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetMarginTop(i) {
        const r = "IDocument::SetMarginTop",
            u = { method: r, margin: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 || f.detail.connect == !1
                            ? i(t)
                            : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static GetOrientation() {
        const i = "IDocument::GetOrientation",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.orientation);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetSheetNames() {
        const i = "IDocument::GetSheetNames",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.names);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetWidth() {
        const i = "IDocument::GetWidth",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.width);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static GetLength() {
        const i = "IDocument::GetLength",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.ret == !1 || f.detail.connect == !1
                            ? r(t)
                            : n(f.detail.length);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SetLength(i) {
        const r = "IDocument::SetLength",
            u = { method: r, length: i },
            f = new Promise((n, i) => {
                const u = (f) => {
                    document.removeEventListener(r, u),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(r, u);
            });
        return n.appendMessage(u), f;
    }
    static Save() {
        const i = "IDocument::Save",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
    static SaveAs(i, r) {
        const u = "IDocument::SaveAs",
            f = { method: u, type: i, filePath: r },
            e = new Promise((n, i) => {
                const r = (f) => {
                    document.removeEventListener(u, r),
                        f.detail.connect == !1 ? i(t) : n(f.detail.ret);
                };
                document.addEventListener(u, r);
            });
        return n.appendMessage(f), e;
    }
    static Export(i, r, u) {
        const f = "IDocument::Export",
            e = { method: f, type: i, filePath: r, dpi: u },
            o = new Promise((n, i) => {
                const r = (u) => {
                    document.removeEventListener(f, r),
                        u.detail.connect == !1 ? i(t) : n(u.detail.ret);
                };
                document.addEventListener(f, r);
            });
        return n.appendMessage(e), o;
    }
    static Close() {
        const i = "IDocument::Close",
            r = { method: i },
            u = new Promise((n, r) => {
                const u = (f) => {
                    document.removeEventListener(i, u),
                        f.detail.connect == !1 ? r(t) : n(f.detail.ret);
                };
                document.addEventListener(i, u);
            });
        return n.appendMessage(r), u;
    }
}
export const IsExtensionInstalled = () =>
    document.body.classList.contains("bpac-extension-installed") ? !0 : !1;
