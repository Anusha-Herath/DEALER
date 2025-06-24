from django.contrib import admin
from .models import (
    Scheme,
    PackageRate,
    SO_TYPES,
    SlabLevel,
    Blacklist,
    SchemeRule,
    SIA_DL_BEARER_RATE
)

admin.site.register(Scheme)
admin.site.register(PackageRate)
admin.site.register(SO_TYPES)
admin.site.register(SlabLevel)
admin.site.register(Blacklist)
admin.site.register(SchemeRule)
admin.site.register(SIA_DL_BEARER_RATE)