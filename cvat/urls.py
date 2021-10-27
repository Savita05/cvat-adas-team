# Copyright (C) 2018-2019 Intel Corporation
#
# SPDX-License-Identifier: MIT

"""CVAT URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.apps import apps
from django.contrib import admin
from django.urls import path, include
from cvat.apps.authentication.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('cvat.apps.engine.urls')),
    path('django-rq/', include('django_rq.urls')),
    path('accounts/' ,include('allauth.urls')),
    # path('accounts/', include('django.contrib.auth.urls')),
    #path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    # path('password_reset/', views.PasswordResetView.as_view(), name='password_reset'),
    # path('password_reset/done/', views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    # path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('reset/done/', views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]

if apps.is_installed('cvat.apps.dataset_repo'):
    urlpatterns.append(path('git/repository/', include('cvat.apps.dataset_repo.urls')))

if apps.is_installed('cvat.apps.log_viewer'):
    urlpatterns.append(path('analytics/', include('cvat.apps.log_viewer.urls')))

if apps.is_installed('cvat.apps.lambda_manager'):
    urlpatterns.append(path('', include('cvat.apps.lambda_manager.urls')))

if apps.is_installed('cvat.apps.opencv'):
    urlpatterns.append(path('opencv/', include('cvat.apps.opencv.urls')))

if apps.is_installed('silk'):
    urlpatterns.append(path('profiler/', include('silk.urls')))

if apps.is_installed('cvat.apps.training'):
    urlpatterns.append(path('api/v1/predict/', include('cvat.apps.training.urls')))
