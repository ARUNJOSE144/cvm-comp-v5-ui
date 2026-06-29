import { jsxs as D, jsx as l } from "react/jsx-runtime";
import S from "react-select";
import R from "react-select/async";
import x from "react-datepicker";
import { useState as w, useEffect as X, useCallback as y } from "react";
const c = {
  TEXT: "0",
  DROP_DOWN: "1",
  MUTLI_SELECT: "2",
  DATE_PICKER: "3",
  DATE_TIME_PICKER: "4",
  START_DATE_PICKER: "5",
  START_DATE_TIME_PICKER: "6",
  END_DATE_PICKER: "7",
  END_DATE_TIME_PICKER: "8",
  ASYNC_DROP_DOWN: "9",
  ASYNC_MUTLI_SELECT: "10",
  TEXT_BOX_DISABLED: "11",
  RADIO_BUTTON: "12",
  CHECK_BOX: "13",
  TEXT_AREA_DISABLED: "14",
  SEARCH_BOX_ICON: "15",
  TEXT_AREA: "16",
  NESTED_DROP_DOWN: "17",
  INPUT_WITH_BUTTON: "18",
  VIEW_DETAILS_BOX: "19",
  FILE_UPLOAD: "20",
  MUTLI_SELECT_ALL: "21"
}, f = (e, a) => Array.isArray(e) ? e.map((t) => B(t, a)) : B(e, a), B = (e, a) => {
  const t = typeof e;
  if (t !== "string" && t !== "number" && t !== "boolean") return e;
  if (a) {
    for (let i = 0; i < a.length; i++)
      if (String(a[i].value) === String(e)) return a[i];
  }
};
function I(e = [], a = !1) {
  if (!Array.isArray(e)) return e;
  try {
    e && a && e.sort((t = {}, i = {}) => {
      let { label: m = "" } = t, { label: u = "" } = i;
      return m == null && (m = ""), u == null && (u = ""), m.toLowerCase() < u.toLowerCase() ? -1 : m.toLowerCase() > u.toLowerCase() ? 1 : 0;
    });
  } catch (t) {
    console.warn(t);
  }
  return e;
}
const z = (e, a, t) => {
  if ($(e))
    for (let i = 0; i < e.length; i++)
      e[i].value = e[i][a], e[i].label = e[i][t];
  return e;
}, $ = (e) => e != null && e !== void 0 && e !== "", k = (e, a) => (e == null ? void 0 : e.value) === (a == null ? void 0 : a.value), V = (e) => {
  const a = () => {
  }, t = () => {
    const d = f(e.value, e.values), s = (r, o) => e.isWithoutLabel ? null : /* @__PURE__ */ l("div", { className: `float-left checkBoxRadio_label ${r ? "checked_box" : "nc_box"}`, children: o });
    return e.values ? e.values.map((r, o) => /* @__PURE__ */ l("div", { className: `checkBoxRadio_container${e.isListedInput ? " cb-listed" : " cb-left"}`, children: /* @__PURE__ */ D("label", { className: "checkBoxRadio radio", children: [
      /* @__PURE__ */ D("div", { className: "float-left btn_container", children: [
        /* @__PURE__ */ l(
          "input",
          {
            type: "radio",
            checked: !!(d && k(d, r)),
            onChange: () => e.onChange(r)
          }
        ),
        /* @__PURE__ */ l("span", { className: "checkmark" })
      ] }),
      s(k(d, r), r.label)
    ] }) }, o)) : null;
  }, i = () => {
    const d = (s, r) => e.isWithoutLabel ? null : /* @__PURE__ */ D("div", { className: `float-left checkBoxRadio_label ${s ? "checked_box" : "nc_box"}`, children: [
      e.isWithoutValue ? r.label : `${r.label}(${r.value})`,
      r.subLabel && /* @__PURE__ */ l("div", { children: r.subLabel })
    ] });
    return e.values ? e.values.map((s, r) => {
      const o = e.value && e.value.some((n) => n.value === s.value);
      return /* @__PURE__ */ l("div", { className: `checkBoxRadio_container${e.isListedInput ? " cb-listed" : " cb-left"}`, children: /* @__PURE__ */ D("label", { className: "checkBoxRadio check", children: [
        /* @__PURE__ */ D("div", { className: "float-left btn_container", children: [
          /* @__PURE__ */ l(
            "input",
            {
              type: "checkbox",
              checked: !!o,
              onChange: () => e.onChange(s)
            }
          ),
          /* @__PURE__ */ l("span", { className: "checkmark" })
        ] }),
        d(o, s)
      ] }) }, r);
    }) : null;
  }, m = `custom-field${e.getOnlyInput ? "" : " form-group"}${e.touched ? " has-danger" : ""}${e.className ? " " + e.className : ""}`, u = "yyyy-MM-dd", h = () => {
    var o;
    const d = e.multi ? [{ label: "Select All", value: "all" }, ...I(e.values, e.isNoSort)] : e.values, s = e.selectall && ((o = e.values) != null && o.length) ? [{ label: "Select All", value: "0" }, ...I(e.values, e.isNoSort)] : I(e.values, e.isNoSort), r = e.menuPortalTarget ? { menuPortal: (n) => ({ ...n, zIndex: 1e4 }) } : void 0;
    switch (e.type) {
      case c.DROP_DOWN:
        return /* @__PURE__ */ l(
          S,
          {
            className: "Select",
            classNamePrefix: "Select",
            placeholder: e.placeholder,
            value: f(e.value, e.values),
            options: (e.isNoSort, s),
            onChange: e.onChange,
            isDisabled: e.disabled,
            onBlur: a,
            isClearable: e.isClearable ?? !0,
            menuPortalTarget: e.menuPortalTarget,
            menuPosition: e.menuPosition,
            styles: r
          }
        );
      case c.MUTLI_SELECT:
        return /* @__PURE__ */ l(
          S,
          {
            className: "Select",
            classNamePrefix: "Select",
            placeholder: e.placeholder,
            value: f(e.value, e.values),
            options: I(e.values),
            onChange: e.onChange,
            isMulti: !0,
            isDisabled: e.disabled,
            onBlur: a,
            menuPortalTarget: e.menuPortalTarget,
            menuPosition: e.menuPosition,
            styles: r
          }
        );
      case c.MUTLI_SELECT_ALL:
        return /* @__PURE__ */ l(
          S,
          {
            className: "Select",
            classNamePrefix: "Select",
            placeholder: e.placeholder,
            value: f(e.value, e.values),
            options: d,
            onChange: (n) => {
              n != null && n.length && n.find((b) => b.value === "all") ? e.onChange(d.slice(1)) : e.multi ? e.onChange(n) : e.onChange(n && n.value || null);
            },
            isMulti: e.multi,
            isDisabled: e.disabled,
            onBlur: a,
            menuPortalTarget: e.menuPortalTarget,
            menuPosition: e.menuPosition,
            styles: r
          }
        );
      case c.DATE_PICKER:
        return /* @__PURE__ */ l(
          x,
          {
            dateFormat: e.dateFormat || u,
            peekNextMonth: !0,
            showMonthDropdown: !0,
            showYearDropdown: !0,
            dropdownMode: "select",
            isClearable: !0,
            selected: e.value,
            onChange: e.onChange,
            className: "form-control",
            todayButton: "Today",
            minDate: e.minDate,
            maxDate: e.maxDate,
            excludeDates: e.excludeDates,
            placeholderText: e.placeholder,
            disabled: e.disabled,
            onBlur: a,
            popperProps: { strategy: "fixed" }
          }
        );
      case c.DATE_TIME_PICKER:
        return /* @__PURE__ */ l(
          x,
          {
            dateFormat: `${e.dateFormat || u} HH:mm`,
            peekNextMonth: !0,
            showMonthDropdown: !0,
            showYearDropdown: !0,
            dropdownMode: "select",
            isClearable: !0,
            selected: e.value,
            onChange: e.onChange,
            className: "form-control",
            todayButton: "Today",
            showTimeSelect: !0,
            timeFormat: "HH:mm",
            timeIntervals: e.interval,
            excludeTimes: e.excludeTimes,
            minTime: e.minTime,
            maxTime: e.maxTime,
            minDate: e.minDate,
            maxDate: e.maxDate,
            excludeDates: e.excludeDates,
            placeholderText: e.placeholder,
            disabled: e.disabled,
            onBlur: a,
            popperProps: { strategy: "fixed" }
          }
        );
      case c.START_DATE_PICKER:
        return /* @__PURE__ */ l(
          x,
          {
            dateFormat: e.dateFormat || u,
            peekNextMonth: !0,
            showMonthDropdown: !0,
            showYearDropdown: !0,
            dropdownMode: "select",
            isClearable: !0,
            selected: e.startDate,
            onChange: e.onChange,
            className: "form-control",
            todayButton: "Today",
            minDate: e.minDate,
            maxDate: e.endDate,
            selectsStart: !0,
            startDate: e.startDate,
            endDate: e.endDate,
            placeholderText: e.placeholder,
            disabled: e.disabled,
            onBlur: a,
            popperProps: { strategy: "fixed" }
          }
        );
      case c.START_DATE_TIME_PICKER:
        return /* @__PURE__ */ l(
          x,
          {
            dateFormat: `${e.dateFormat || u} HH:mm`,
            peekNextMonth: !0,
            showMonthDropdown: !0,
            showYearDropdown: !0,
            dropdownMode: "select",
            isClearable: !0,
            selected: e.startDate,
            onChange: e.onChange,
            className: "form-control",
            todayButton: "Today",
            showTimeSelect: !0,
            timeFormat: "HH:mm",
            timeIntervals: e.interval,
            minTime: e.minTime,
            maxTime: e.maxTime,
            minDate: e.minDate,
            maxDate: e.maxDate,
            selectsStart: !0,
            startDate: e.startDate,
            endDate: e.endDate,
            placeholderText: e.placeholder,
            disabled: e.disabled,
            onBlur: a,
            popperProps: { strategy: "fixed" }
          }
        );
      case c.END_DATE_PICKER:
        return /* @__PURE__ */ l(
          x,
          {
            dateFormat: e.dateFormat || u,
            peekNextMonth: !0,
            showMonthDropdown: !0,
            showYearDropdown: !0,
            dropdownMode: "select",
            isClearable: !0,
            selected: e.endDate,
            onChange: e.onChange,
            className: "form-control",
            todayButton: "Today",
            minDate: e.startDate,
            maxDate: e.maxDate,
            selectsEnd: !0,
            startDate: e.startDate,
            endDate: e.endDate,
            placeholderText: e.placeholder,
            disabled: e.disabled,
            onBlur: a,
            popperPlacement: "bottom-end",
            popperProps: { strategy: "fixed" }
          }
        );
      case c.END_DATE_TIME_PICKER:
        return /* @__PURE__ */ l(
          x,
          {
            dateFormat: `${e.dateFormat || u} HH:mm`,
            peekNextMonth: !0,
            showMonthDropdown: !0,
            showYearDropdown: !0,
            dropdownMode: "select",
            isClearable: !0,
            selected: e.endDate,
            onChange: e.onChange,
            className: "form-control",
            todayButton: "Today",
            showTimeSelect: !0,
            timeFormat: "HH:mm",
            timeIntervals: e.interval,
            minTime: e.minTime,
            maxTime: e.maxTime,
            minDate: e.startDate,
            maxDate: e.maxDate,
            selectsEnd: !0,
            startDate: e.startDate,
            endDate: e.endDate,
            placeholderText: e.placeholder,
            disabled: e.disabled,
            onBlur: a,
            popperProps: { strategy: "fixed" }
          }
        );
      case c.ASYNC_DROP_DOWN:
        return /* @__PURE__ */ l(
          R,
          {
            className: "Select",
            classNamePrefix: "Select",
            value: e.value,
            onChange: e.onChange,
            loadOptions: e.loadOptions,
            placeholder: e.placeholder,
            isDisabled: e.disabled,
            onBlur: a
          }
        );
      case c.ASYNC_MUTLI_SELECT:
        return /* @__PURE__ */ l(
          R,
          {
            className: "Select",
            classNamePrefix: "Select",
            value: e.value,
            onChange: e.onChange,
            loadOptions: e.loadOptions,
            isMulti: !0,
            placeholder: e.placeholder,
            isDisabled: e.disabled,
            onBlur: a
          }
        );
      case c.TEXT_BOX_DISABLED:
        return /* @__PURE__ */ l(
          "input",
          {
            readOnly: !0,
            value: e.value,
            placeholder: e.placeholder,
            className: "disabled-input form-control disabed-text",
            type: "text",
            onBlur: a,
            title: e.value
          }
        );
      case c.RADIO_BUTTON: {
        const n = /* @__PURE__ */ l("div", { className: `checkBoxRadio_main${e.isWithoutLabel ? "" : " rc-mandatory"}${e.isListedInput ? " rc-listed" : ""}`, children: t() });
        return e.isListedInput ? /* @__PURE__ */ l("div", { className: e.listedClassName || "", children: n }) : n;
      }
      case c.CHECK_BOX: {
        const n = /* @__PURE__ */ l("div", { className: `checkBoxRadio_main${e.isWithoutLabel ? "" : " rc-mandatory"}${e.isListedInput ? " rc-listed" : ""}`, children: i() });
        return e.isListedInput ? /* @__PURE__ */ l("div", { className: e.listedClassName || "", children: n }) : n;
      }
      case c.TEXT_AREA_DISABLED:
        return /* @__PURE__ */ l("textarea", { readOnly: !0, value: e.value, className: "form-control disabed-text" });
      case c.SEARCH_BOX_ICON:
        return /* @__PURE__ */ D("div", { className: "select-modal", children: [
          /* @__PURE__ */ l("span", { className: "select-modal-label", children: e.fieldValue }),
          /* @__PURE__ */ l("div", { className: "icon-box", onClick: e.onClick, children: /* @__PURE__ */ l("span", { className: `icon fa ${e.icon || "fa-plus"}` }) })
        ] });
      case c.TEXT_AREA:
        return /* @__PURE__ */ l(
          "textarea",
          {
            value: e.value,
            placeholder: e.placeholder,
            onChange: (n) => e.onChange ? e.onChange(n.target.value, {}, n) : null,
            className: "form-control",
            disabled: !!e.disabled,
            onBlur: a
          }
        );
      case c.NESTED_DROP_DOWN: {
        const n = (b) => {
          const v = Object.fromEntries(Object.entries(b).filter(([L]) => L !== "children"));
          return b.children && (v.options = b.children.map(n)), v;
        };
        return /* @__PURE__ */ l(
          S,
          {
            className: "Select",
            classNamePrefix: "Select",
            placeholder: e.placeholder,
            value: f(e.value, e.values),
            options: (e.values || []).map(n),
            onChange: e.onChange,
            isDisabled: e.disabled,
            onBlur: a,
            menuPortalTarget: e.menuPortalTarget,
            menuPosition: e.menuPosition,
            styles: r
          }
        );
      }
      case c.INPUT_WITH_BUTTON:
        return /* @__PURE__ */ D("div", { className: "input-group", children: [
          /* @__PURE__ */ l(
            "input",
            {
              disabled: !!e.disabled,
              value: e.value,
              placeholder: e.placeholder,
              maxLength: e.maxLength,
              onChange: (n) => e.onChange ? e.onChange(n.target.value) : null,
              className: "form-control",
              type: e.inputType || "text",
              onBlur: a
            }
          ),
          /* @__PURE__ */ l("div", { className: "input-group-append", children: /* @__PURE__ */ l("button", { className: "btn btn-outline-secondary", type: "button", onClick: e.onButtonClick, children: e.buttonLabel }) })
        ] });
      case c.VIEW_DETAILS_BOX:
        return /* @__PURE__ */ l("div", { className: "disabled-input form-control disabed-text disabled-input-div", children: e.value });
      case c.FILE_UPLOAD:
        return null;
      default:
        return /* @__PURE__ */ l(
          "input",
          {
            value: e.value,
            maxLength: e.maxLength,
            placeholder: e.placeholder,
            onChange: (n) => e.onChange ? e.onChange(n.target.value) : null,
            className: "form-control",
            type: e.inputType || "text",
            readOnly: !!e.disabled,
            title: e.noTitle ? "" : e.value,
            onBlur: a
          }
        );
    }
  }, E = () => /* @__PURE__ */ D("div", { className: e.ismandatory ? `${m} required` : m, stt: e.stt, children: [
    /* @__PURE__ */ l("label", { className: e.ismandatory ? "form-control-label required" : "form-control-label", children: e.label }),
    h(),
    /* @__PURE__ */ l("div", { className: "text-help", children: e.touched && e.error ? e.error : "" })
  ] });
  return e.isListedInput ? h() : e.getOnlyInput ? /* @__PURE__ */ D("div", { className: e.ismandatory ? `${m} required only-input-field` : `${m} only-input-field`, children: [
    h(),
    /* @__PURE__ */ l("div", { className: "text-help", children: e.touched ? e.error : "" })
  ] }) : /* @__PURE__ */ l("div", { className: "gn-field-col", children: E() });
}, _ = {
  MANDATORY: "Required",
  MAX_LENGTH: "Maximum Length Must Be #{value}",
  MIN_LENGTH: "Minimum Length Must Be #{value}",
  REG_EX: "Invalid Format",
  MIN_SIZE: "Select Atleast #{value}",
  MAX_SIZE: "Can't Select More Than #{value}"
}, H = (e, a, t, i, m) => {
  var u, h, E, d, s, r;
  if (!a || a === void 0)
    return { hasError: !0, errorMsg: _.MANDATORY };
  if (!t) return { hasError: !1, errorMsg: "" };
  if (i) {
    const o = i(e, a, t);
    if (o) return o;
  }
  if (t.ismandatory === !0 && (!a || Array.isArray(a) && a.length < 1))
    return { hasError: !0, errorMsg: ((u = t.messages) == null ? void 0 : u.mandatory) || _.MANDATORY };
  if (a && t.minSize && t.minSize > a.length)
    return { hasError: !0, errorMsg: ((h = t.messages) == null ? void 0 : h.minSize) || _.MIN_SIZE.replace("#{value}", t.minSize) };
  if (a && t.maxSize && t.maxSize < a.length)
    return { hasError: !0, errorMsg: ((E = t.messages) == null ? void 0 : E.maxSize) || _.MAX_SIZE.replace("#{value}", t.maxSize) };
  if (a && t.maxLength && t.maxLength < a.length)
    return { hasError: !0, errorMsg: ((d = t.messages) == null ? void 0 : d.maxLength) || _.MAX_LENGTH.replace("#{value}", t.maxLength) };
  if (a && t.minLength && t.minLength > a.length)
    return { hasError: !0, errorMsg: ((s = t.messages) == null ? void 0 : s.minLength) || _.MIN_LENGTH.replace("#{value}", t.minLength) };
  if (a && t.regex && !t.regex.test(a))
    return { hasError: !0, errorMsg: ((r = t.messages) == null ? void 0 : r.regex) || _.REG_EX };
  if (m) {
    const o = m(e, a, t);
    if (o) return o;
  }
  return { hasError: !1, errorMsg: "" };
};
function j(e, a = {}, t = {}) {
  const { preValidation: i, postValidation: m, onValueChange: u } = t, [h, E] = w(a), [d, s] = w({});
  X(() => {
    Object.keys(a).length > 0 && E(a);
  }, [a]);
  const r = (T, N, M) => {
    var O;
    const { isTouched: g } = M || { isTouched: !1 };
    g && (N = h[T]);
    const C = d;
    if (e[T]) {
      const A = H(T, N, e[T], i, m);
      C[T] = A || { hasError: !1, errorMsg: "" };
    }
    const [P = null] = u ? u(T, N, h, C) : [];
    if (E((A) => P ?? { ...A, [T]: N }), s(C), g && ((O = d[T]) != null && O.hasError))
      return s(d), !1;
  }, o = (T) => {
    const N = { ...d };
    T.forEach((g) => {
      const C = H(g, h[g], e[g], i, m);
      N[g] = C || { hasError: !1, errorMsg: "" };
    });
    const M = Object.values(N).some((g) => g.hasError);
    return s(N), M;
  }, n = () => {
    E(a), s({});
  }, b = y(r, [e, h, d]), v = y(o, [e, h, d]), L = y(n, [e, h, d]);
  return [h, d, b, { validateValues: v, reset: L }];
}
export {
  c as FIELD_TYPES,
  V as FieldItem,
  z as createOptions,
  f as expandSelectValue,
  I as sortOptionsByLabel,
  j as useFieldItem,
  H as validateForm
};
