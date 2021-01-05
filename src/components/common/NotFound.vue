<template>
    <div class="error-wrapper">
        <i class="el-icon-warning"></i>

        <h1>404</h1>

        <h2>page not found</h2>

        <div class="page-404">Something went wrong or that page doesn’t exist yet.
            <div class="btn-box">
                <el-button type="warning">
                    <router-link :to="{name: 'index'}">Return Home</router-link>
                </el-button>
            </div>
        </div>
    </div>
</template>
