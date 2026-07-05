"""Filter classes for NovaTaxi API."""
import django_filters
from django_filters import rest_framework as filters


class BaseFilter(django_filters.FilterSet):
    """Base filter with common date range filtering."""
    
    created_at_from = django_filters.DateTimeFilter(
        field_name='created_at',
        lookup_expr='gte'
    )
    created_at_to = django_filters.DateTimeFilter(
        field_name='created_at',
        lookup_expr='lte'
    )
    
    class Meta:
        fields = []


class DateRangeFilter(BaseFilter):
    """Filter by date range."""
    
    class Meta:
        fields = ['created_at_from', 'created_at_to']
