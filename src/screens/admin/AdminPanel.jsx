import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    seedProductsFromCatalog,
} from '../../auth/productsSlice';
import ProductForm from './ProductForm';
import './style.css';

const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'salads', label: 'Salads' },
    { id: 'combos', label: 'Combos' },
];

const AdminPanel = () => {
    const dispatch = useDispatch();
    const { list, isLoading, loaded } = useSelector((state) => state.products);

    const [activeCategory, setActiveCategory] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        if (!loaded) dispatch(fetchProducts());
    }, [dispatch, loaded]);

    const filtered =
        activeCategory === 'all'
            ? list
            : list.filter((p) => p.category === activeCategory);

    const handleAddClick = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        if (editingProduct) {
            await dispatch(updateProduct({ id: editingProduct.id, data }));
        } else {
            await dispatch(createProduct(data));
        }
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleDelete = async () => {
        if (!confirmDelete) return;
        await dispatch(deleteProduct(confirmDelete.id));
        setConfirmDelete(null);
    };

    const handleSeed = async () => {
        setSeeding(true);
        await dispatch(seedProductsFromCatalog());
        setSeeding(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">
                        Admin <span>Panel</span>
                    </h1>
                    <p className="admin-subtitle">Manage products on your menu</p>
                </div>
                <button className="admin-btn-primary" onClick={handleAddClick}>
                    + Add Product
                </button>
            </div>

            <div className="admin-tabs">
                {CATEGORIES.map((c) => (
                    <button
                        key={c.id}
                        className={`admin-tab ${activeCategory === c.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(c.id)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {isLoading && <p className="admin-empty">Loading products...</p>}

            {!isLoading && loaded && list.length === 0 && (
                <div className="admin-empty-state">
                    <p>No products in the database yet.</p>
                    <button
                        className="admin-btn-primary"
                        onClick={handleSeed}
                        disabled={seeding}
                    >
                        {seeding
                            ? 'Initializing...'
                            : 'Initialize products from default catalog'}
                    </button>
                </div>
            )}

            {!isLoading && filtered.length > 0 && (
                <div className="admin-products-grid">
                    {filtered.map((product) => (
                        <div key={product.id} className="admin-product-card">
                            <div className="admin-product-image-wrap">
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="admin-product-image"
                                    onError={(e) => {
                                        e.currentTarget.style.opacity = '0.2';
                                    }}
                                />
                            </div>
                            <div className="admin-product-body">
                                <span className="admin-product-category">
                                    {product.category}
                                </span>
                                <h3 className="admin-product-title">{product.title}</h3>
                                <p className="admin-product-description">
                                    {product.description}
                                </p>
                                <div className="admin-product-meta">
                                    <span className="admin-product-price">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                    <span className="admin-product-rating">
                                        ★ {product.rating ?? '—'}
                                    </span>
                                </div>
                            </div>
                            <div className="admin-product-actions">
                                <button
                                    className="admin-btn-secondary"
                                    onClick={() => handleEditClick(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="admin-btn-danger"
                                    onClick={() => setConfirmDelete(product)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <ProductForm
                    initial={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            {confirmDelete && (
                <div
                    className="admin-modal-backdrop"
                    onClick={() => setConfirmDelete(null)}
                >
                    <div
                        className="admin-modal admin-confirm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Delete product?</h3>
                        <p>
                            Are you sure you want to delete{' '}
                            <strong>{confirmDelete.title}</strong>? This action cannot be
                            undone.
                        </p>
                        <div className="admin-modal-actions">
                            <button
                                className="admin-btn-secondary"
                                onClick={() => setConfirmDelete(null)}
                            >
                                Cancel
                            </button>
                            <button className="admin-btn-danger" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
