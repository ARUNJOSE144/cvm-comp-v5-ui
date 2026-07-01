import { useState, useEffect, useMemo, useRef } from 'react';

const PAGE_SIZES = [10, 20, 50, 100];

function SortIcon({ active, dir }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2V12" stroke={active ? '#0099FF' : '#C6C6C6'} strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M4 5L7 2L10 5" stroke={active && dir === 'asc' ? '#0099FF' : '#C6C6C6'} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 9L7 12L10 9" stroke={active && dir === 'desc' ? '#0099FF' : '#C6C6C6'} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 13L7 9L11 5" stroke="#555" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 5L11 9L7 13" stroke="#555" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3.5"  r="1.25" fill="#1D1D1D"/>
      <circle cx="8" cy="8"    r="1.25" fill="#1D1D1D"/>
      <circle cx="8" cy="12.5" r="1.25" fill="#1D1D1D"/>
    </svg>
  );
}

export default function DataTable({
  title,
  subtitle,
  columns       = [],
  data,
  loadData,
  showHeader    = true,
  showFooter    = true,
  headerActions,
  searchPlaceholder = 'Search...',
  defaultPageSize   = 10,
  rowActions,
  selectable    = true,
}) {
  const [apiRows,    setApiRows]    = useState([]);
  const [apiTotal,   setApiTotal]   = useState(0);
  const [loading,    setLoading]    = useState(false);
  const [search,     setSearch]     = useState('');
  const [page,       setPage]       = useState(1);
  const [pageSize,   setPageSize]   = useState(defaultPageSize);
  const [sortKey,    setSortKey]    = useState(null);
  const [sortDir,    setSortDir]    = useState('asc');
  const [selected,   setSelected]   = useState(new Set());
  const [openAction, setOpenAction] = useState(null);
  const menuRef = useRef(null);

  // API mode — re-fetch when params change
  useEffect(() => {
    if (!loadData) return;
    let cancelled = false;
    setLoading(true);
    Promise.resolve(loadData({ page, pageSize, search, sortKey, sortDir }))
      .then(result => {
        if (cancelled) return;
        setApiRows(result.rows  || result.data  || []);
        setApiTotal(result.total ?? (result.rows || result.data || []).length);
      })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [loadData, page, pageSize, search, sortKey, sortDir]);

  // Static-data mode — filter / sort / paginate in-memory
  const { displayRows, total } = useMemo(() => {
    if (loadData) return { displayRows: apiRows, total: apiTotal };

    let r = [...(data || [])];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(row =>
        columns.some(col => {
          const v = row[col.key];
          return v != null && String(v).toLowerCase().includes(q);
        })
      );
    }
    if (sortKey) {
      r.sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ?  1 : -1;
        return 0;
      });
    }
    const t = r.length;
    return { displayRows: r.slice((page - 1) * pageSize, page * pageSize), total: t };
  }, [loadData, data, apiRows, apiTotal, search, sortKey, sortDir, page, pageSize, columns]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Close action menu on outside click
  useEffect(() => {
    if (openAction === null) return;
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenAction(null);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [openAction]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  const handleSearch = (val) => { setSearch(val); setPage(1); };

  const rowKey = (row, idx) => row.id ?? row._id ?? idx;

  const allSelected = displayRows.length > 0 &&
    displayRows.every(r => selected.has(rowKey(r, null) ?? JSON.stringify(r)));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(displayRows.map((r, i) => rowKey(r, i) ?? JSON.stringify(r))));
    }
  };

  const toggleRow = (row, idx) => {
    const k = rowKey(row, idx) ?? JSON.stringify(row);
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });
  };

  // Compact page-number list: 1 2 … cur-1 cur cur+1 … last-1 last
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
    const nums = [...set].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const result = [];
    nums.forEach((n, i) => {
      if (i > 0 && n - nums[i - 1] > 1) result.push('…');
      result.push(n);
    });
    return result;
  }, [page, totalPages]);

  return (
    <div className="gn-dt">

      {/* ── Toolbar ─────────────────────────────────────────────── */}
      {showHeader && (
        <div className="gn-dt__toolbar">
          <div className="gn-dt__toolbar-left">
            {title    && <span className="gn-dt__title">{title}</span>}
            {subtitle && <span className="gn-dt__subtitle">{subtitle}</span>}
          </div>
          <div className="gn-dt__toolbar-right">
            <div className="gn-dt__search-wrap">
              <svg className="gn-dt__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.75" stroke="#8D8D8D" strokeWidth="1.25"/>
                <path d="M10.5 10.5L14 14" stroke="#8D8D8D" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
              <input
                className="gn-dt__search-input"
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
            {headerActions && headerActions.map((action, i) => (
              <button
                key={i}
                type="button"
                className={`gn-dt__hdr-btn${action.primary ? ' gn-dt__hdr-btn--primary' : ''}`}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.icon && <span className="gn-dt__hdr-btn-icon">{action.icon}</span>}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────────── */}
      <div className="gn-dt__wrap">
        {loading && <div className="gn-dt__loading"><span>Loading…</span></div>}

        <table className="gn-dt__table">
          <thead>
            <tr className="gn-dt__head-row">
              {selectable && (
                <th className="gn-dt__th gn-dt__th--check">
                  <input
                    type="checkbox"
                    className="gn-dt__checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`gn-dt__th${col.sortable !== false ? ' gn-dt__th--sort' : ''}`}
                  style={col.width ? { width: col.width, minWidth: col.width } : undefined}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="gn-dt__th-label">{col.label}</span>
                  {col.sortable !== false && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </th>
              ))}
              {rowActions && (
                <th className="gn-dt__th gn-dt__th--actions">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="gn-dt__empty"
                >
                  {loading ? '' : 'No data found'}
                </td>
              </tr>
            ) : displayRows.map((row, idx) => {
              const rk = rowKey(row, idx);
              const isSel = selected.has(rk ?? JSON.stringify(row));
              return (
                <tr key={rk} className={`gn-dt__row${isSel ? ' gn-dt__row--sel' : ''}`}>
                  {selectable && (
                    <td className="gn-dt__td gn-dt__td--check">
                      <input
                        type="checkbox"
                        className="gn-dt__checkbox"
                        checked={isSel}
                        onChange={() => toggleRow(row, idx)}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="gn-dt__td">
                      {col.render
                        ? col.render(row[col.key], row)
                        : <span className="gn-dt__cell">{row[col.key] ?? '—'}</span>
                      }
                    </td>
                  ))}
                  {rowActions && (
                    <td className="gn-dt__td gn-dt__td--actions" ref={openAction === rk ? menuRef : null}>
                      <div className="gn-dt__action-wrap">
                        <button
                          type="button"
                          className={`gn-dt__dots${openAction === rk ? ' gn-dt__dots--open' : ''}`}
                          onClick={() => setOpenAction(openAction === rk ? null : rk)}
                        >
                          <DotsIcon />
                        </button>
                        {openAction === rk && (
                          <div className="gn-dt__action-menu">
                            {rowActions.map((action, ai) => (
                              <button
                                key={ai}
                                type="button"
                                className="gn-dt__action-item"
                                onClick={() => { action.onClick(row); setOpenAction(null); }}
                              >
                                <span>{action.label}</span>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                                  <path d="M4 6L7 9L10 6" stroke="#6D6D6D" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Footer / Pagination ──────────────────────────────────── */}
      {showFooter && (
        <div className="gn-dt__footer">
          <div className="gn-dt__per-page">
            <div className="gn-dt__per-page-select-wrap">
              <select
                className="gn-dt__per-page-select"
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              >
                {PAGE_SIZES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="gn-dt__per-page-caret">
                <path d="M4 6L7 9L10 6" stroke="#1D1D1D" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="gn-dt__per-page-label">Per View</span>
          </div>

          <div className="gn-dt__pagination">
            <button
              type="button"
              className="gn-dt__pg-btn gn-dt__pg-btn--nav"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>

            {pageNumbers.map((n, i) =>
              n === '…' ? (
                <span key={`ellipsis-${i}`} className="gn-dt__pg-ellipsis">…</span>
              ) : (
                <button
                  key={n}
                  type="button"
                  className={`gn-dt__pg-btn${page === n ? ' gn-dt__pg-btn--active' : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              )
            )}

            <button
              type="button"
              className="gn-dt__pg-btn gn-dt__pg-btn--nav"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
