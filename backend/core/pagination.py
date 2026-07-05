"""Pagination classes for NovaTaxi API."""
from rest_framework.pagination import PageNumberPagination, CursorPagination


class StandardPagination(PageNumberPagination):
    """Standard pagination with 20 items per page."""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
    page_size_template = 'pagination/numbers.html'


class LargeResultsSetPagination(PageNumberPagination):
    """Pagination for large result sets with 100 items per page."""
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class SmallResultsSetPagination(PageNumberPagination):
    """Pagination for small result sets with 5 items per page."""
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 20


class StandardCursorPagination(CursorPagination):
    """Cursor-based pagination for better performance with large datasets."""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
    ordering = '-created_at'
