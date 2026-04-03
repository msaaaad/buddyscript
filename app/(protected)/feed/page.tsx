'use client'

import { useAuth } from '@/hooks/useAuth'
import { usePosts } from '@/hooks/usePosts'
import Navbar from '@/components/feed/Navbar'
import DarkModeToggle from '@/components/feed/DarkModeToggle'
import LeftSidebar from '@/components/feed/LeftSidebar'
import RightSidebar from '@/components/feed/RightSidebar'
import StorySection from '@/components/feed/StorySection'
import PostForm from '@/components/feed/PostForm'
import PostCard from '@/components/feed/PostCard'

export default function FeedPage() {
    const { user } = useAuth()
    const {
        posts,
        isLoading,
        error,
        createPost,
        deletePost,
        toggleLike,
        addComment,
        deleteComment,
    } = usePosts()

    return (
        <div className="_layout _layout_main_wrapper">
            <DarkModeToggle />
            <div className="_main_layout">
                <Navbar />
                <div className="container _custom_container">
                    <div className="_layout_inner_wrap">
                        <div className="row">
                            <LeftSidebar />
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="_layout_middle_wrap">
                                    <div className="_layout_middle_inner">
                                        <StorySection />
                                        <PostForm onSubmit={createPost} />
                                        {isLoading && (
                                            <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                                                <p>Loading posts...</p>
                                            </div>
                                        )}
                                        {error && (
                                            <div className="alert alert-danger">
                                                Something went wrong. Please refresh.
                                            </div>
                                        )}
                                        {!isLoading && posts.length === 0 && (
                                            <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                                                <p>No posts yet. Be the first to post!</p>
                                            </div>
                                        )}
                                        {posts.map(post => (
                                            <PostCard
                                                key={post._id}
                                                post={post}
                                                currentUserId={user?._id ?? ''}
                                                onToggleLike={toggleLike}
                                                onDeletePost={deletePost}
                                                onAddComment={addComment}
                                                onDeleteComment={deleteComment}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}