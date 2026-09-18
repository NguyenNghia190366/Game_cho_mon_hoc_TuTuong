import { useState } from "react";

import { ITEM_ASSETS } from "./data/itemAssets";

export default function InventoryPanel({ items, onClose }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const slots = Array.from({ length: 25 }, (_, index) => items[index] || null);

  return (
    <div className="dialog-overlay inventory-overlay" role="dialog" aria-modal="true">
      <div className="inventory-panel">
        <img
          className="inventory-panel-art"
          src={ITEM_ASSETS.inventoryPanel}
          alt="Bảng vật phẩm"
        />

        <button
          type="button"
          className="inventory-close"
          onClick={onClose}
          aria-label="Đóng balo"
        >
          <img src={ITEM_ASSETS.closeButton} alt="" />
        </button>

        <div className="inventory-slots">
          {slots.map((item, index) => (
            <button
              type="button"
              className="inventory-slot"
              key={item?.instanceId || index}
              disabled={item?.type !== "gem"}
              onClick={() => item?.type === "gem" && setSelectedItem(item)}
              aria-label={item?.type === "gem" ? `Xem lại ${item.label}` : undefined}
            >
              {item?.type === "gem" && (
                <span className="inventory-gem" title={item.label} />
              )}

              {item?.type === "key" && (
                <img src={ITEM_ASSETS.key} alt={item.label} title={item.label} />
              )}

              {item && <small>{item.shortLabel}</small>}
            </button>
          ))}
        </div>

        {selectedItem && (
          <div className="inventory-review">
            <span className="inventory-review-kicker">
              {selectedItem.question
                ? "VIÊN NGỌC ĐẶC BIỆT"
                : "VIÊN NGỌC KIẾN THỨC"}
            </span>

            <h2>Ngọc {selectedItem.shortLabel}</h2>

            {selectedItem.knowledge && (
              <div className="inventory-review-knowledge">
                <h3>{selectedItem.knowledge.title}</h3>
                <strong>Sự kiện và nội dung</strong>
                <p>{selectedItem.knowledge.event}</p>
                <strong>Ý nghĩa đối với tư tưởng</strong>
                <p>{selectedItem.knowledge.meaning}</p>
                <strong>Mối liên hệ</strong>
                <p>{selectedItem.knowledge.connection}</p>
              </div>
            )}

            {selectedItem.question && (
              <div className="inventory-review-question">
                <strong>Câu hỏi</strong>
                <p>{selectedItem.question.text}</p>

                <strong>Đáp án đúng</strong>
                <p className="correct-answer">
                  {selectedItem.question.correctAnswer}
                </p>
              </div>
            )}

            <button
              type="button"
              className="primary-button"
              onClick={() => setSelectedItem(null)}
            >
              QUAY LẠI BALO
            </button>
          </div>
        )}

        <strong className="inventory-count">{items.length} / 25</strong>
      </div>
    </div>
  );
}
