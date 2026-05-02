import django_filters

from submissions import models


class SubmissionFilterSet(django_filters.FilterSet):
    """Basic filter set for the submissions list endpoint.

    Only the status filter is implemented so the candidate can extend the
    remaining filters (broker, company search, optional extras, etc.).
    """

    status = django_filters.CharFilter(
        field_name="status",
        lookup_expr="iexact",
    )

    brokerId = django_filters.NumberFilter(  # noqa: N815 – param name must match frontend
        field_name="broker_id",
        lookup_expr="exact",
    )

    companySearch = django_filters.CharFilter(  # noqa: N815
        field_name="company__legal_name",
        lookup_expr="icontains",
    )

    createdFrom = django_filters.DateFilter(  # noqa: N815
        field_name="created_at",
        lookup_expr="date__gte",
    )

    createdTo = django_filters.DateFilter(  # noqa: N815
        field_name="created_at",
        lookup_expr="date__lte",
    )

    hasDocuments = django_filters.BooleanFilter(  # noqa: N815
        method="filter_has_documents",
        label="Has documents",
    )

    hasNotes = django_filters.BooleanFilter(  # noqa: N815
        method="filter_has_notes",
        label="Has notes",
    )

    class Meta:
        model = models.Submission
        fields = ["status", "brokerId", "companySearch", "createdFrom", "createdTo", "hasDocuments", "hasNotes"]

    def filter_has_documents(self, queryset, name, value):  # noqa: ARG002
        """Filter submissions that have (or don't have) at least one document."""
        if value is True:
            return queryset.filter(documents__isnull=False).distinct()
        if value is False:
            return queryset.filter(documents__isnull=True)
        return queryset

    def filter_has_notes(self, queryset, name, value):  # noqa: ARG002
        """Filter submissions that have (or don't have) at least one note."""
        if value is True:
            return queryset.filter(notes__isnull=False).distinct()
        if value is False:
            return queryset.filter(notes__isnull=True)
        return queryset

