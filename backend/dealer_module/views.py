from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Scheme, PackageRate, SO_TYPES, SlabLevel, Blacklist, SIA_DL_BEARER_RATE
from .serializers import SchemeSerializer, PackageRateSerializer, SOTypesSerializer, SlabLevelSerializer, BlacklistSerializer, BearerRateSerializer

# ViewSet for managing Scheme objects.
# class SchemeViewSet(viewsets.ModelViewSet):
#     queryset = Scheme.objects.all()
#     serializer_class = SchemeSerializer
#     # lookup_field = 'SCHEME_NUM'

#     # def perform_create(self, serializer):
#     #     print('Incoming validated data:', serializer.validated_data)
#     #     print('vvvvv',self)
#     #     serializer.save(CREATED_USER=self.request.user if self.request.user.is_authenticated else None)

#     # def perform_update(self, serializer):
#     #     serializer.save(UPDATED_USER=self.request.user if self.request.user.is_authenticated else None)
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(CREATED_USER=self.request.user if self.request.user.is_authenticated else None)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save(UPDATED_USER=str(self.request.user) if self.request.user.is_authenticated else "admin")
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['patch'], url_path='inactive')
#     def set_inactive(self, request, SCHEME_ID=None):
#         """Set the Scheme's STATUS to 'INACTIVE'."""
#         scheme = get_object_or_404(Scheme, SCHEME_ID=SCHEME_ID)
#         if scheme.STATUS == 'INACTIVE':
#             return Response(
#                 {'detail': 'Scheme is already inactive'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         scheme.STATUS = 'INACTIVE'
#         scheme.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
#         scheme.save()
#         serializer = self.get_serializer(scheme)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     @action(detail=True, methods=['patch'])
#     def activate(self, request, SCHEME_ID=None):
#         """Activate a Scheme instance."""
#         instance = self.get_object()
#         instance.STATUS = 'ACTIVE'
#         instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
#         instance.save()
#         return Response({'status': 'Activated'}, status=status.HTTP_200_OK)

#     @action(detail=True, methods=['patch'])
#     def deactivate(self, request, SCHEME_ID=None):
#         """Deactivate a Scheme instance."""
#         instance = self.get_object()
#         instance.STATUS = 'INACTIVE'
#         instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
#         instance.save()
#         return Response({'status': 'Deactivated'}, status=status.HTTP_200_OK)

   
#     @action(detail=False, methods=['get'], url_path='active')
#     def get_active_schemes(self, request):
#         """Fetches all active schemes."""
#         active_schemes = Scheme.objects.filter(STATUS='ACTIVE')
#         serializer = self.get_serializer(active_schemes, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# ViewSet for managing SchemeRule objects.
# class SchemeRuleViewSet(viewsets.ModelViewSet):
#     queryset = SchemeRule.objects.all()
#     serializer_class = SchemeRuleSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ViewSet for managing PackageRate objects.
class PackageRateViewSet(viewsets.ModelViewSet):
    queryset = PackageRate.objects.all()
    serializer_class = PackageRateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(CREATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(UPDATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def set_compliance_pass(self, request, pk=None):
        instance = self.get_object()
        instance.COMPLIANCE = 'P'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Compliance set to Pass'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def set_compliance_fail(self, request, pk=None):
        instance = self.get_object()
        instance.COMPLIANCE = 'F'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Compliance set to Fail'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def enable_stage_check(self, request, pk=None):
        instance = self.get_object()
        instance.STAGE_LEVEL_STATUS_CHECK = 'Y'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Stage level check enabled'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def disable_stage_check(self, request, pk=None):
        instance = self.get_object()
        instance.STAGE_LEVEL_STATUS_CHECK = 'N'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Stage level check disabled'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def set_status(self, request, pk=None):
        instance = self.get_object()
        new_status = request.data.get('STATUS')
        if new_status not in ['ACTIVE', 'INACTIVE', 'PENDING']:
            return Response({'error': 'Invalid status value'}, status=status.HTTP_400_BAD_REQUEST)
        instance.STATUS = new_status
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': f'Status changed to {new_status}'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def activate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'ACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Activated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'INACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Deactivated'}, status=status.HTTP_200_OK)

# ViewSet for managing SO_TYPES objects.
class SO_TYPESViewSet(viewsets.ModelViewSet):
    queryset = SO_TYPES.objects.all()
    serializer_class = SOTypesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(CREATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(UPDATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def activate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'ACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Activated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'INACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Deactivated'}, status=status.HTTP_200_OK)

# ViewSet for managing SlabLevel objects.
class SlabLevelViewSet(viewsets.ModelViewSet):
    queryset = SlabLevel.objects.all()
    serializer_class = SlabLevelSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(CREATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(UPDATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def activate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'ACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Activated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'INACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Deactivated'}, status=status.HTTP_200_OK)

# ViewSet for managing Blacklist objects.
class BlacklistViewSet(viewsets.ModelViewSet):
    queryset = Blacklist.objects.all()
    serializer_class = BlacklistSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(CREATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(UPDATED_USER=self.request.user if self.request.user.is_authenticated else None)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def activate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'ACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Activated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'INACTIVE'
        instance.UPDATED_USER = self.request.user if self.request.user.is_authenticated else None
        instance.save()
        return Response({'status': 'Deactivated'}, status=status.HTTP_200_OK)

# ViewSet for managing BearerRate objects.
class BearerRateViewSet(viewsets.ModelViewSet):
    queryset = SIA_DL_BEARER_RATE.objects.all()
    serializer_class = BearerRateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(CREATED_USER=self.request.user.username if self.request.user.is_authenticated else 'system')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(UPDATED_USER=self.request.user.username if self.request.user.is_authenticated else 'system')
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def activate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'ACTIVE'
        instance.UPDATED_USER = self.request.user.username if self.request.user.is_authenticated else 'system'
        instance.save()
        return Response({'status': 'Activated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        instance = self.get_object()
        instance.STATUS = 'INACTIVE'
        instance.UPDATED_USER = self.request.user.username if self.request.user.is_authenticated else 'system'
        instance.save()
        return Response({'status': 'Deactivated'}, status=status.HTTP_200_OK)
    

class SchemeViewSet(viewsets.ModelViewSet):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer
    lookup_field = 'SCHEME_NUM'  # Allow lookup by SCHEME_NUM instead of default 'pk'

    def perform_create(self, serializer):
        serializer.save(CREATE_USER=self.request.user.username)

    def perform_update(self, serializer):
        serializer.save(UPDATE_USER=self.request.user.username)

    @action(detail=True, methods=['patch'], url_path='inactive')
    def set_inactive(self, request, scheme_num=None):
        """Set the Scheme's STATUS to 'inactive'."""
        scheme = get_object_or_404(Scheme, SCHEME_NUM=scheme_num)
        if scheme.STATUS == 'inactive':
            return Response(
                {'detail': 'Scheme is already inactive'},
                status=status.HTTP_400_BAD_REQUEST
            )
        scheme.STATUS = 'inactive'
        scheme.UPDATE_USER = request.user.username
        scheme.save()
        serializer = self.get_serializer(scheme)
        return Response(serializer.data, status=status.HTTP_200_OK)
    