from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from todos.views import RegisterView, TodoListCreateView, TodoRetrieveUpdateDestroyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    path('api/todos/<int:pk>/', TodoRetrieveUpdateDestroyView.as_view(), name='todo-detail'),
]