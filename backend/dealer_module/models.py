from django.db import models
from django.conf import settings

# Scheme Model
class Scheme(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    SCHEME_NUM = models.CharField(max_length=10, db_column='SCHEME_NUM')
    SCHEME_NAME = models.CharField(max_length=50, db_column='SCHEME_NAME')
    STATUS = models.CharField(max_length=50, choices=[('ACTIVE', 'ACTIVE'), ('INACTIVE', 'INACTIVE')], db_column='STATUS')
    START_DATE = models.DateField(null=True, blank=True)  
    ATTACHMENT = models.FileField(
        # storage=attachment_storage,
        upload_to='scheme_attachments/',
        null=True,
        blank=True
    ) 
    CREATED_DATE = models.DateTimeField(auto_now_add=True, db_column='CREATED_DATE', null=True)
    CREATED_USER = models.CharField(max_length=50, blank=True, db_column='CREATED_USER', null=True)
    UPDATED_DATE = models.DateTimeField(auto_now=True, db_column='UPDATED_DATE', null=True)
    UPDATED_USER = models.CharField(max_length=50, blank=True, db_column='UPDATED_USER', null=True)
    
    # SUPPORT_DOCS = models.FileField(upload_to='support_docs/', null=True, blank=True, db_column='SUPPORT_DOCS')

    class Meta:
        db_table = 'SIA_DL_SCHEME'

    def __str__(self):
        return self.SCHEME_NAME

# Scheme Rule Model
class SchemeRule(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    SCHEME = models.ForeignKey(
        Scheme,
        on_delete=models.CASCADE,
        related_name='RULES_BY_ID',
        to_field='ID',
        db_column='SCHEME_ID'
    )
    SCHEME_NUM = models.CharField(max_length=50, db_column='SCHEME_NUM')
    TABLE_NAME = models.CharField(max_length=50, db_column='TABLE_NAME')
    RT_ID = models.CharField(max_length=100, db_column='RT_ID') #primary key in scheme 

    class Meta:
        db_table = 'SIA_DL_SCHEME_RULES'
        indexes = [
            models.Index(fields=['SCHEME']),
            models.Index(fields=['SCHEME_NUM']),
        ]

    @property
    def RULE_URL(self):
        return getattr(settings, f'VITE_{self.RT_ID}_URL', '')

    def __str__(self):
        return f"{self.SCHEME.SCHEME_ID} - {self.RT_ID}"

# Package Rate Table
class PackageRate(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    PACKAGE_RATE_ID = models.CharField(max_length=50, db_column='PACKAGE_RATE_ID')
    TARIFF_ID = models.CharField(max_length=50, db_column='TARIFF_ID')
    PACKAGE_NAME = models.CharField(max_length=50, db_column='PACKAGE_NAME')
    COMPLIANCE = models.CharField(max_length=1, choices=[('P', 'PASS'), ('F', 'FAIL')], db_column='COMPLIANCE')
    STAGE_LEVEL_STATUS_CHECK = models.CharField(max_length=1, choices=[('Y', 'YES'), ('N', 'NO')], db_column='STAGE_LEVEL_STATUS_CHECK')
    SLAB_LEVEL_1_RATE = models.DecimalField(max_digits=10, decimal_places=2, db_column='SLAB_LEVEL_1_RATE')
    BASE_RATE = models.DecimalField(max_digits=10, decimal_places=2, db_column='BASE_RATE')
    CREATED_DATE = models.DateTimeField(auto_now_add=True, db_column='CREATED_DATE', null=True)
    CREATED_USER = models.CharField(max_length=50, blank=True, db_column='CREATED_USER', null=True)
    UPDATED_DATE = models.DateTimeField(auto_now=True, db_column='UPDATED_DATE', null=True)
    UPDATED_USER = models.CharField(max_length=50, blank=True, db_column='UPDATED_USER', null=True)
    # DELETED_DATE = models.DateTimeField(null=True, blank=True, db_column='DELETED_DATE')
    # DELETED_USER = models.CharField(max_length=50, blank=True, db_column='DELETED_USER')
    STATUS = models.CharField(max_length=50, choices=[('ACTIVE', 'ACTIVE'), ('INACTIVE', 'INACTIVE')], db_column='STATUS')

    class Meta:
        db_table = 'SIA_DL_PACKAGE_RATES'

    def __str__(self):
        return self.PACKAGE_NAME

# SO_TYPES Table
class SO_TYPES(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    SO_TYPE_ID = models.CharField(max_length=50, db_column='SO_TYPE_ID')
    PRODUCT = models.CharField(max_length=50, db_column='PRODUCT')
    SERVICE_TYPE = models.CharField(max_length=50, db_column='SERVICE_TYPE')
    ORDER_TYPE = models.CharField(max_length=50, db_column='ORDER_TYPE')
    CREATED_DATE = models.DateTimeField(auto_now_add=True, db_column='CREATED_DATE', null=True)
    CREATED_USER = models.CharField(max_length=50, blank=True, db_column='CREATED_USER', null=True)
    UPDATED_DATE = models.DateTimeField(auto_now=True, db_column='UPDATED_DATE', null=True)
    UPDATED_USER = models.CharField(max_length=50, blank=True, db_column='UPDATED_USER', null=True)
    # DELETED_DATE = models.DateTimeField(null=True, blank=True, db_column='DELETED_DATE')
    # DELETED_USER = models.CharField(max_length=50, blank=True, db_column='DELETED_USER')
    STATUS = models.CharField(max_length=50, choices=[('ACTIVE', 'ACTIVE'), ('INACTIVE', 'INACTIVE')], db_column='STATUS')

    class Meta:
        db_table = 'SIA_DL_SO_TYPES'

    def __str__(self):
        return self.PRODUCT

# Slab Level Table
class SlabLevel(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    SLAB_ID = models.CharField(max_length=50, db_column='SLAB_ID')
    SLAB_LEVEL = models.CharField(max_length=50, db_column='SLAB_LEVEL')
    UPPER_RANGE = models.DecimalField(max_digits=15, decimal_places=2, db_column='UPPER_RANGE')
    LOWER_RANGE = models.DecimalField(max_digits=15, decimal_places=2, db_column='LOWER_RANGE')
    # UPPER_RANGE = models.FloatField(db_column='UPPER_RANGE')
    # LOWER_RANGE = models.FloatField(db_column='LOWER_RANGE')
    CREATED_DATE = models.DateTimeField(auto_now_add=True,  null=True, db_column='CREATED_DATE')
    CREATED_USER = models.CharField(max_length=50, blank=True, db_column='CREATED_USER' , null=True)
    UPDATED_DATE = models.DateTimeField(auto_now=True, db_column='UPDATED_DATE' , null=True)
    UPDATED_USER = models.CharField(max_length=50, blank=True, null=True, db_column='UPDATED_USER')
    STATUS = models.CharField(max_length=50, choices=[('ACTIVE', 'ACTIVE'), ('INACTIVE', 'INACTIVE')], db_column='STATUS', default='ACTIVE')

    class Meta:
        db_table = 'SIA_DL_SLAB_LEVELS'

    def __str__(self):
        return f"SLAB_ID: {self.SLAB_ID} | LEVEL: {self.SLAB_LEVEL}"

# Blacklist Table
class Blacklist(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    BLP_ID = models.CharField(max_length=50, db_column='BLP_ID')
    TARIFF_ID = models.CharField(max_length=50, db_column='TARIFF_ID')
    PACKAGE_NAME = models.CharField(max_length=50, db_column='PACKAGE_NAME')
    CREATED_DATE = models.DateTimeField(auto_now_add=True, db_column='CREATED_DATE', null=True)
    CREATED_USER = models.CharField(max_length=50, blank=True, db_column='CREATED_USER', null=True)
    UPDATED_DATE = models.DateTimeField(auto_now=True, db_column='UPDATED_DATE', null=True)
    UPDATED_USER = models.CharField(max_length=50, blank=True, db_column='UPDATED_USER', null=True)
    # DELETED_DATE = models.DateTimeField(null=True, blank=True, db_column='DELETED_DATE')
    # DELETED_USER = models.CharField(max_length=50, blank=True, db_column='DELETED_USER')
    STATUS = models.CharField(max_length=50, choices=[('ACTIVE', 'ACTIVE'), ('INACTIVE', 'INACTIVE')], db_column='STATUS')

    class Meta:
        db_table = 'SIA_DL_BLACKLIST_PACKAGES'

    def __str__(self):
        return self.TARIFF_ID

# Scheme Details Table


# Bearer Rate Table
class SIA_DL_BEARER_RATE(models.Model):
    ID = models.AutoField(primary_key=True, db_column='ID')
    SERVICE_TYPE = models.CharField(max_length=50, db_column='SERVICE_TYPE')
    ORDER_TYPE = models.CharField(max_length=50, db_column='ORDER_TYPE')
    COMPLIANCE = models.CharField(max_length=1, default='P', db_column='COMPLIANCE')
    RATES_UNDER_SLAB_LEVELS = models.DecimalField(max_digits=10, decimal_places=2, default=0, db_column='RATES_UNDER_SLAB_LEVELS')
    STATUS = models.CharField(max_length=50, default='ACTIVE', db_column='STATUS')
    CREATED_DATE = models.DateTimeField(auto_now_add=True, db_column='CREATED_DATE', null=True)
    CREATED_USER = models.CharField(max_length=50, blank=True, db_column='CREATED_USER', null=True)
    UPDATED_DATE = models.DateTimeField(auto_now=True, null=True, blank=True, db_column='UPDATED_DATE')
    UPDATED_USER = models.CharField(max_length=50, blank=True, db_column='UPDATED_USER', null=True)

    class Meta:
        db_table = 'SIA_DL_BEARER_RATE'

    def __str__(self):
        return f"BEARER_RATE {self.ID} - {self.SERVICE_TYPE}"