class PostNotFound(Exception):
    def __init__(self, category_slug: str, slug: str):
        self.category_slug = category_slug
        self.slug = slug
        super().__init__(f"Статья не найдена: {category_slug}/{slug}")
