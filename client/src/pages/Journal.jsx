
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../api/auth";
import { getEntries, createEntry, deleteEntry, updateEntry } from "../api/entries";
import "../App.css";

const categories = [
  "Book",
  "Film & Series",
  "Place",
  "Skill",
  "Reflection",
];

function Journal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Reflection");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  async function loadEntries() {
    const data = await getEntries();
    const list = Array.isArray(data)
      ? data
      : data.entries || data.data || [];
    setEntries(list);
  }

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const userData = await getCurrentUser();
        const currentUser = userData.user || userData;

        if (!active) return;
        setUser(currentUser);

        const entryData = await getEntries();
        const list = Array.isArray(entryData)
          ? entryData
          : entryData.entries || entryData.data || [];

        if (active) setEntries(list);
      } catch {
        if (active) navigate("/login", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    }

    initialize();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleCreate(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await createEntry({
        title: title.trim(),
        category,
        description: description.trim(),
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });

      setTitle("");
      setCategory("Reflection");
      setDescription("");
      setTags("");
      await loadEntries();
    } catch (err) {
      setError(err.message || "Unable to save your entry.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this journal entry? This cannot be undone.")) {
      return;
    }

    setError("");

    try {
      await deleteEntry(id);
      setEntries((current) =>
        current.filter((entry) => (entry._id || entry.id) !== id)
      );
    } catch (err) {
      setError(err.message || "Unable to delete this entry.");
    }
  }
  
function handleEdit(entry) {
  setEditingId(entry._id || entry.id);
  setEditForm({
    title: entry.title || "",
    category: entry.category || "Reflection",
    description: entry.description || "",
    tags: (entry.tags || []).join(", "),
  });
}

async function handleUpdate(event) {
  event.preventDefault();
  if (!editForm || !editingId) return;

  setError("");
  setSaving(true);

  try {
    await updateEntry(editingId, {
      title: editForm.title.trim(),
      category: editForm.category,
      description: editForm.description.trim(),
      tags: editForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    await loadEntries();
    setEditingId(null);
    setEditForm(null);
  } catch (err) {
    setError(err.message || "Unable to update your entry.");
  } finally {
    setSaving(false);
  }
}


  async function handleLogout() {
    try {
      await logoutUser();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log out.");
    }
  }

  if (loading) {
    return <main className="auth-page"><p>Opening your journal...</p></main>;
  }

  if (!user) return null;

  return (
    <main className="journal-page">
      <header className="journal-header">
        <Link className="brand" to="/">
          <span className="brand-mark">f.</span><span>folio</span>
        </Link>
        <button className="login-button" onClick={handleLogout}>Log out</button>
      </header>

      <section className="journal-welcome">
        <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
        <h1>Your story, so far.</h1>
        <p className="auth-description">
          Welcome back, {user.name || "friend"}. Let's collect something meaningful.
        </p>
      </section>

      <section className="journal-content">
        <div>
          <p className="eyebrow">SAVE A LITTLE MOMENT</p>
          <h2>Add to your collection.</h2>
        </div>

        <form className="auth-form journal-form" onSubmit={handleCreate}>
          <label htmlFor="entry-title">Title</label>
          <input
            id="entry-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What do you want to remember?"
            maxLength={160}
            required
          />

          <label htmlFor="entry-category">Category</label>
          <select
            id="entry-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <label htmlFor="entry-description">Your thoughts</label>
          <textarea
            id="entry-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write down what made it meaningful..."
            rows={4}
            maxLength={10000}
            required
          />

          <label htmlFor="entry-tags">Tags (optional)</label>
          <input
            id="entry-tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="inspiring, weekend, favourite"
          />

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="primary-button auth-submit" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save to Folio"}
            {!saving && <span> ↗</span>}
          </button>
        </form>
      </section>

      <section className="journal-content">
        <p className="eyebrow">YOUR COLLECTION</p>
        <h2>Your entries ({entries.length})</h2>

        {entries.length === 0 ? (
          <div className="journal-empty">
            <span className="category-icon">✳</span>
            <h3>Your collection starts here.</h3>
            <p>Save your first book, place, discovery, or reflection above.</p>
          </div>
        ) : (
          <div className="journal-entry-list">
            {entries.map((entry) => {
              const id = entry._id || entry.id;

              return (
                <article className="category-card journal-entry" key={id}>
                  <p className="category-number">{entry.category}</p>
                  
{editingId === id && editForm ? (
  <form className="auth-form" onSubmit={handleUpdate}>
    <label>Title</label>
    <input
      value={editForm.title}
      onChange={(event) =>
        setEditForm({ ...editForm, title: event.target.value })
      }
      maxLength={160}
      required
    />

    <label>Category</label>
    <select
      value={editForm.category}
      onChange={(event) =>
        setEditForm({ ...editForm, category: event.target.value })
      }
      required
    >
      {categories.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>

    <label>Your thoughts</label>
    <textarea
      value={editForm.description}
      onChange={(event) =>
        setEditForm({ ...editForm, description: event.target.value })
      }
      rows={4}
      maxLength={10000}
      required
    />

    <label>Tags (comma-separated)</label>
    <input
      value={editForm.tags}
      onChange={(event) =>
        setEditForm({ ...editForm, tags: event.target.value })
      }
    />

    <button className="primary-button" type="submit" disabled={saving}>
      {saving ? "Saving..." : "Save changes"}
    </button>

    <button
      className="login-button"
      type="button"
      onClick={() => {
        setEditingId(null);
        setEditForm(null);
      }}
    >
      Cancel
    </button>
  </form>
) : (
  <>
    <h3>{entry.title}</h3>
    <p>{entry.description}</p>
  </>
)}

                  {entry.tags?.length > 0 && (
                    <p className="entry-tags">
                      {entry.tags.map((tag) => `#${tag}`).join("  ")}
                    </p>
                  )}
                  
<button
  className="login-button"
  type="button"
  onClick={() => handleEdit(entry)}
>
  Edit entry
</button>

                  <button
                    className="login-button"
                    type="button"
                    onClick={() => handleDelete(id)}
                  >
                    Delete entry
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Journal;
