from rest_framework import serializers
from .models import Scheme, SchemeRule, PackageRate, SO_TYPES, SlabLevel, Blacklist, SIA_DL_BEARER_RATE

# class SchemeRuleSerializer(serializers.ModelSerializer):
#     RULE_URL = serializers.CharField(read_only=True)
#     SCHEME_ID = serializers.PrimaryKeyRelatedField(
#         source='SCHEME',
#         queryset=Scheme.objects.all(),
#         write_only=True,
#         required=False
#     )
#     SCHEME_NUM = serializers.CharField(write_only=True, required=False)

#     class Meta:
#         model = SchemeRule
#         fields = ['ID', 'SCHEME_ID', 'SCHEME_NUM', 'TABLE_NAME', 'RT_ID', 'RULE_URL']

# class SchemeSerializer(serializers.ModelSerializer):
#      class Meta:
#         model = Scheme
#         fields = '__all__'
class SchemeRuleSerializer(serializers.ModelSerializer):
    RULE_URL = serializers.CharField(read_only=True)
    SCHEME_ID = serializers.PrimaryKeyRelatedField(
        source='SCHEME', 
        queryset=Scheme.objects.all(), 
        write_only=True, 
        required=False
    )
    SCHEME_NUM = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = SchemeRule
        fields = ['ID', 'SCHEME_ID', 'SCHEME_NUM', 'TABLE_NAME', 'RT_ID', 'RULE_URL']

class SchemeSerializer(serializers.ModelSerializer):
    RULES = SchemeRuleSerializer(source='rules_by_id', many=True, read_only=True)
    RULES_DATA = SchemeRuleSerializer(many=True, write_only=True, required=False)
    ATTACHMENT_URL = serializers.SerializerMethodField()

    class Meta:
        model = Scheme
        fields = [
            'ID', 'SCHEME_NUM', 'SCHEME_NAME', 'STATUS', 'START_DATE',
            'ATTACHMENT', 'ATTACHMENT_URL',
            'CREATE_DATE', 'CREATE_USER', 'UPDATE_DATE', 'UPDATE_USER',
            'RULES', 'RULES_DATA'
        ]
        read_only_fields = ['CREATE_DATE', 'CREATE_USER', 'UPDATE_DATE', 'UPDATE_USER']

    def get_ATTACHMENT_URL(self, obj):
        if obj.ATTACHMENT:
            return obj.ATTACHMENT.url
        return None

    def create(self, validated_data):
        rules_data = validated_data.pop('RULES_DATA', [])
        attachment = validated_data.pop('ATTACHMENT', None)
        scheme = Scheme.objects.create(**validated_data)
        
        if attachment:
            scheme.ATTACHMENT = attachment
            scheme.save()
            
        for rule_data in rules_data:
            rule_data.pop('SCHEME_ID', None)
            rule_data.pop('SCHEME_NUM', None)
            SchemeRule.objects.create(SCHEME=scheme, SCHEME_NUM=scheme.SCHEME_NUM, **rule_data)
        return scheme

    def update(self, instance, validated_data):
        rules_data = validated_data.pop('RULES_DATA', None)
        attachment = validated_data.pop('ATTACHMENT', None)

        # Update Scheme fields
        instance.SCHEME_NUM = validated_data.get('SCHEME_NUM', instance.SCHEME_NUM)
        instance.SCHEME_NAME = validated_data.get('SCHEME_NAME', instance.SCHEME_NAME)
        instance.STATUS = validated_data.get('STATUS', instance.STATUS)
        instance.START_DATE = validated_data.get('START_DATE', instance.START_DATE)
        
        if attachment is not None:
            instance.ATTACHMENT = attachment
            
        instance.save()

        # Update nested SchemeRule instances if RULES_DATA is provided
        if rules_data is not None:
            instance.rules_by_id.all().delete()
            for rule_data in rules_data:
                rule_data.pop('SCHEME_ID', None)
                rule_data.pop('SCHEME_NUM', None)
                SchemeRule.objects.create(SCHEME=instance, SCHEME_NUM=instance.SCHEME_NUM, **rule_data)

        return instance
  


# class PackageRateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PackageRate
#         fields = [
#             'ID','PACKAGE_RATE_ID', 'TARIFF_ID', 'PACKAGE_NAME', 'COMPLIANCE',
#             'STAGE_LEVEL_STATUS_CHECK', 'SLAB_LEVEL_1_RATE', 'BASE_RATE',
#             'CREATED_DATE', 'CREATED_USER', 'UPDATED_DATE', 'UPDATED_USER',
#              'STATUS'
#         ]
#         read_only_fields = ['CREATED_DATE', 'UPDATED_DATE']

# class SOTypesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SO_TYPES
#         fields = [
#             'ID','SO_TYPE_ID', 'PRODUCT', 'SERVICE_TYPE', 'ORDER_TYPE',
#             'CREATED_DATE', 'CREATED_USER', 'UPDATED_DATE', 'UPDATED_USER',
#              'STATUS'
#         ]
#         read_only_fields = ['CREATED_DATE', 'UPDATED_DATE']

# class SlabLevelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SlabLevel
#         fields = [
#             'ID', 'SLAB_ID', 'SLAB_LEVEL', 'UPPER_RANGE', 'LOWER_RANGE',
#             'CREATED_DATE', 'CREATED_USER', 'UPDATED_DATE', 'UPDATED_USER', 'STATUS'
#         ]
#         read_only_fields = ['ID', 'CREATED_DATE', 'UPDATED_DATE']

# class BlacklistSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Blacklist
#         fields = [
#             'ID','BLP_ID', 'TARIFF_ID', 'PACKAGE_NAME', 'CREATED_DATE', 'CREATED_USER',
#             'UPDATED_DATE', 'UPDATED_USER', 'STATUS'
#         ]
#         read_only_fields = ['CREATED_DATE', 'UPDATED_DATE']


# class BearerRateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SIA_DL_BEARER_RATE
#         fields = [
#             'ID', 'SERVICE_TYPE', 'ORDER_TYPE', 'COMPLIANCE',
#             'RATES_UNDER_SLAB_LEVELS', 'STATUS', 'CREATED_DATE', 'CREATED_USER',
#             'UPDATED_DATE', 'UPDATED_USER'
#         ]
#         read_only_fields = ['ID', 'CREATED_DATE', 'UPDATED_DATE']

class PackageRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageRate
        fields = '__all__'

class SOTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SO_TYPES
        fields = '__all__'

class SlabLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlabLevel
        fields = '__all__'

class BlacklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blacklist
        fields = '__all__'

class BearerRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SIA_DL_BEARER_RATE
        fields = '__all__'