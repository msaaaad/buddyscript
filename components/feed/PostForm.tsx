'use client'

import { useState } from 'react'

interface PostFormProps {
  onSubmit: (data: {
    content: string
    imageUrl?: string
    visibility: 'public' | 'private'
  }) => Promise<void>
  authorImage?: string
}

export default function PostForm({ onSubmit, authorImage }: PostFormProps) {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setError('')
    setIsSubmitting(true)
    try {
      await onSubmit({
        content,
        imageUrl: imageUrl.trim() || undefined,
        visibility,
      })
      setContent('')
      setImageUrl('')
      setVisibility('public')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">
            <img src={authorImage || '/assets/images/txt_img.png'} alt="Image" className="_txt_img" />
          </div>
          <div className="form-floating _feed_inner_text_area_box_form">
            <textarea
              className="form-control _textarea"
              id="floatingTextarea"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              Write something ...
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
                <path fill="#666" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5z" />
              </svg>
            </label>
          </div>
        </div>
        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <input
                type="url"
                className="form-control d-flex align-items-center"
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                style={{ fontSize: '12px', width: '150px' }}
              />
            </div>
            <div className="_feed_inner_text_area_bottom_video _feed_common">
              <select
                className="form-select d-flex align-items-center"
                value={visibility}
                onChange={e => setVisibility(e.target.value as 'public' | 'private')}
                style={{ fontSize: '12px', width: '150px' }}
              >
                <option value="public">Public</option>
                <option value="private">Private (Only me)</option>
              </select>
            </div>
          </div>
          <div className="_feed_inner_text_area_post_btn">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}