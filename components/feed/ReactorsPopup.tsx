'use client'

interface Reactor {
  _id: string
  userId: {
    _id: string
    firstName: string
    lastName: string
  }
}

interface ReactorsPopupProps {
  reactors: Reactor[]
  isLoading: boolean
  onClose: () => void
}

export default function ReactorsPopup({ reactors, isLoading, onClose }: ReactorsPopupProps) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'var(--white, #fff)',
        border: '1px solid #eee',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        padding: '12px',
        zIndex: 100,
        minWidth: '180px',
        maxHeight: '200px',
        overflowY: 'auto',
        top: '24px',
        left: '0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Liked by</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#666' }}
        >
          ✕
        </button>
      </div>
      {isLoading ? (
        <p style={{ fontSize: '12px', color: '#666' }}>Loading...</p>
      ) : reactors.length === 0 ? (
        <p style={{ fontSize: '12px', color: '#666' }}>No reactions yet</p>
      ) : (
        reactors.map(r => (
          <div key={r._id} style={{ fontSize: '13px', padding: '4px 0', borderBottom: '1px solid #f5f5f5' }}>
            {r.userId.firstName} {r.userId.lastName}
          </div>
        ))
      )}
    </div>
  )
}