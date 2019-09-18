let config;

if (process.env.NODE_ENV === "production") {
    config = {
        $api_url: "http://mayordomia.produccion.devcomer.com",
        $token: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdlMzgyM2FiNWIwMGM5MTA2NTYzY2M0MzE0ZmVmNjQ3MWI5NGIzM2U3YTMzNWZiYTdkNjYyYmE2MTZmNGNjYTkwNDc0NzM3NjcwZjZiZjM3In0.eyJhdWQiOiIxIiwianRpIjoiN2UzODIzYWI1YjAwYzkxMDY1NjNjYzQzMTRmZWY2NDcxYjk0YjMzZTdhMzM1ZmJhN2Q2NjJiYTYxNmY0Y2NhOTA0NzQ3Mzc2NzBmNmJmMzciLCJpYXQiOjE1Njc2MDQ2NTksIm5iZiI6MTU2NzYwNDY1OSwiZXhwIjoxNTk5MjI3MDU5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nfjM3aoXZdZS6BuaiKmrAGvDADgzrLjfEth_veJE8aIf7aTO20B2dMR9KzCr3779IM3647jtFCbgpb_JQO6dPb0fL9rrHdnwE2hmV72w0u46JKoGprrcm12CVAaFerB7gWgkdgIfgVOV1Yl5h2pJCtWGt4rKoKVSoaOHZiK-6lNSTv9WPyMNKrGNOzvBmwLitg0jD0p27-VmxPYdL3Zzf-z-xKBT3Oo2Hpn9c5Cn8YJ4TN7koYwgZFk1oOLo8IMJ9slcWDUtCR9RevLMSnt_XO-HxUzrFCqzTOk90lj7NmrvRhBSA1JZH-0E12KKxe1KFYjfziyG1I6CbO-KP2dm-fAiQRWKz5Oh351L79oKZofTvjaTr1vPPHe90-PYb830swE6045y9A8-dD0rPnOVEKa2KSMBohOSjLfem0KZZngN6eLxBW7Ovv8l4NxMSz6B8NhwzD_8Tj5p1Hm7hNYuy53r2hrnrBaoPQeQLo7WUZ7qWzkmTCw0BN5EobuEwIZyZ72QCYIwNboZ9FrkhYBguiN1Be1P8TqYpmzV3LFWINDI3WNlmBcrUtFj68RjQX6p5u5hKdziHPnW71dv6KG5LWYeZqBhVbUSo8aPqx5irDlDxy6GpBxzT_LrnMA_5DvOowuBNfll1xjYTFoK7Q01VbLLd2HZr-bD-nJbhJOmvAo",
        $env: process.env.NODE_ENV
    };
} else {
    config = {
        $api_url: "http://local.mayordomia.nicosli.com",
        $token: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0NjUzYmIwYzhiZTE0OWIyNjU5YjgyZTM4NzY3YzgzYmZlNjg0ZGE5ZWY4ODkzNGY1YzNhNzg3MTczZWFjZDNkMDRiM2U0MDY2MDQyMTgyIn0.eyJhdWQiOiIyIiwianRpIjoiNjQ2NTNiYjBjOGJlMTQ5YjI2NTliODJlMzg3NjdjODNiZmU2ODRkYTllZjg4OTM0ZjVjM2E3ODcxNzNlYWNkM2QwNGIzZTQwNjYwNDIxODIiLCJpYXQiOjE1Njg3NzcxMDUsIm5iZiI6MTU2ODc3NzEwNSwiZXhwIjoxNjAwMzk5NTA0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WvUx8RsvOxPdVXQgnRkvvGKVH0Ru-6UEof6jNOkr09gYDR4zSeGC23NOUMF2qogwnG6YW6wYG0oZ3-uc_9SVc0YwNSSv1cgQI-bzSEu6PneSzgCBRHAMGqIrmgJUkYg_Nn5L4mgVVhJAs6s2X6A1lPnQmm6MUe0_VYyv8axOsm0dCksie6fRE8_Qlfy0IlAUZJPOzyvHy864llO0CtJRSXdsbe770l21-6-N6sXodJuFhebwGWQiekYYlKnT31t52krHfoQO6vvy0uno_38HIOiUfivaKa0D_qzWxmoESSsC1dkCn4tVCD-sHZI-Nn88smGqJwJS-nbe3ZSXwztK1yO2xIL54GDtNpVs1ZgmHMTpg1HLiJWKK0VxXXB5x9aCQZh7JBeklD1yHNMIL-gLHImtqa1j1GVMFIWXan1qTi6Si0FAl7dZueAOUYtNJlihxSjlZQftwDjFiCmmYfNlnZBEnOhcfApPasyovvmGR10kR8L9xsA6_pOSlEyCf5vStjTDhgPZmmLO4TQ7m8_U_CXF2HMwr6lo1_WIIVtgF2LYQiAwlFexZ90_uNSRIvutcgfwUs8X3RXixJNeQeQYU7G1ono1TMoanldYKEQuCdslvjPmufRhRCOLAOOZyngoRATyE93Flf3sTuSO23kBhDAlA9si5ZS0-NmUGz-F2ao",
        $env: process.env.NODE_ENV
    };
}

export { config }