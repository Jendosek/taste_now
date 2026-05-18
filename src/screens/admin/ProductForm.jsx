import React, { useState } from 'react';

const EMPTY = {
    category: 'pizzas',
    title: '',
    description: '',
    price: '',
    rating: '',
    imageUrl: '',
    availableToppings: [],
};

const ProductForm = ({ initial, onSubmit, onCancel }) => {
    const [form, setForm] = useState(() =>
        initial
            ? {
                  category: initial.category || 'pizzas',
                  title: initial.title || '',
                  description: initial.description || '',
                  price: initial.price ?? '',
                  rating: initial.rating ?? '',
                  imageUrl: initial.imageUrl || '',
                  availableToppings: initial.availableToppings
                      ? initial.availableToppings.map((t) => ({ ...t }))
                      : [],
              }
            : EMPTY
    );
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

    const setTopping = (idx, key, value) => {
        setForm((f) => {
            const next = f.availableToppings.map((t, i) =>
                i === idx ? { ...t, [key]: value } : t
            );
            return { ...f, availableToppings: next };
        });
    };

    const addTopping = () =>
        setForm((f) => ({
            ...f,
            availableToppings: [...f.availableToppings, { name: '', price: '' }],
        }));

    const removeTopping = (idx) =>
        setForm((f) => ({
            ...f,
            availableToppings: f.availableToppings.filter((_, i) => i !== idx),
        }));

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Required';
        if (!form.category) e.category = 'Required';
        if (!form.imageUrl.trim()) e.imageUrl = 'Required';
        const priceNum = Number(form.price);
        if (form.price === '' || Number.isNaN(priceNum) || priceNum < 0)
            e.price = 'Enter a valid price';
        if (form.rating !== '' && form.rating !== null) {
            const r = Number(form.rating);
            if (Number.isNaN(r) || r < 0 || r > 5) e.rating = '0-5 only';
        }
        return e;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;

        const data = {
            category: form.category,
            title: form.title.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            rating: form.rating === '' ? null : Number(form.rating),
            imageUrl: form.imageUrl.trim(),
            availableToppings: form.availableToppings
                .filter((t) => t.name && t.name.trim() !== '')
                .map((t) => ({
                    name: t.name.trim(),
                    price: Number(t.price) || 0,
                })),
        };

        setSubmitting(true);
        try {
            await onSubmit(data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-modal-backdrop" onClick={onCancel}>
            <div
                className="admin-modal admin-form-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="admin-form-title">
                    {initial ? 'Edit Product' : 'Add Product'}
                </h2>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-row">
                        <label className="admin-field">
                            <span>Category</span>
                            <select
                                value={form.category}
                                onChange={(e) => setField('category', e.target.value)}
                            >
                                <option value="pizzas">Pizzas</option>
                                <option value="burgers">Burgers</option>
                                <option value="salads">Salads</option>
                                <option value="combos">Combos</option>
                            </select>
                            {errors.category && (
                                <span className="admin-field-error">{errors.category}</span>
                            )}
                        </label>

                        <label className="admin-field">
                            <span>Title</span>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setField('title', e.target.value)}
                                placeholder="e.g. Pepperoni Pizza"
                            />
                            {errors.title && (
                                <span className="admin-field-error">{errors.title}</span>
                            )}
                        </label>
                    </div>

                    <label className="admin-field">
                        <span>Description</span>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={(e) => setField('description', e.target.value)}
                            placeholder="Short product description"
                        />
                    </label>

                    <div className="admin-form-row">
                        <label className="admin-field">
                            <span>Price ($)</span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={(e) => setField('price', e.target.value)}
                                placeholder="11.99"
                            />
                            {errors.price && (
                                <span className="admin-field-error">{errors.price}</span>
                            )}
                        </label>

                        <label className="admin-field">
                            <span>Rating (0-5)</span>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={form.rating}
                                onChange={(e) => setField('rating', e.target.value)}
                                placeholder="4.5"
                            />
                            {errors.rating && (
                                <span className="admin-field-error">{errors.rating}</span>
                            )}
                        </label>
                    </div>

                    <label className="admin-field">
                        <span>Image URL</span>
                        <input
                            type="text"
                            value={form.imageUrl}
                            onChange={(e) => setField('imageUrl', e.target.value)}
                            placeholder="/products/pizzas/pepperoni_pizza.png"
                        />
                        {errors.imageUrl && (
                            <span className="admin-field-error">{errors.imageUrl}</span>
                        )}
                    </label>

                    <div className="admin-toppings">
                        <div className="admin-toppings-header">
                            <span>Available Toppings</span>
                            <button
                                type="button"
                                className="admin-btn-secondary admin-btn-small"
                                onClick={addTopping}
                            >
                                + Add Topping
                            </button>
                        </div>

                        {form.availableToppings.length === 0 && (
                            <p className="admin-toppings-empty">No toppings yet.</p>
                        )}

                        {form.availableToppings.map((t, idx) => (
                            <div key={idx} className="admin-topping-row">
                                <input
                                    type="text"
                                    placeholder="Topping name"
                                    value={t.name}
                                    onChange={(e) => setTopping(idx, 'name', e.target.value)}
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Price"
                                    value={t.price}
                                    onChange={(e) =>
                                        setTopping(idx, 'price', e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="admin-btn-danger admin-btn-small"
                                    onClick={() => removeTopping(idx)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="admin-modal-actions">
                        <button
                            type="button"
                            className="admin-btn-secondary"
                            onClick={onCancel}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="admin-btn-primary"
                            disabled={submitting}
                        >
                            {submitting
                                ? 'Saving...'
                                : initial
                                ? 'Save Changes'
                                : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
