let config;

if (process.env.NODE_ENV === "production") {
    config = {
        $api_url: "http://mayordomia.produccion.devcomer.com",
        $token: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIwMzhkYTI3YmMzNGJkMzc3ZjkxZjA5M2JiMGU3Yzg3ZGUzYWFkMzE2YmNkMDJiNTZkNGM2ZmUwZmYyODFkZGY5ZDUyODg5YzQ4MjM2ZTNmIn0.eyJhdWQiOiIxIiwianRpIjoiMjAzOGRhMjdiYzM0YmQzNzdmOTFmMDkzYmIwZTdjODdkZTNhYWQzMTZiY2QwMmI1NmQ0YzZmZTBmZjI4MWRkZjlkNTI4ODljNDgyMzZlM2YiLCJpYXQiOjE1NjY1MzQ3MDEsIm5iZiI6MTU2NjUzNDcwMSwiZXhwIjoxNTk4MTU3MTAxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.HdhlrGNPBV2XQOqjKhuuWZqS0DI98yQ7INA-O75QkGcyL6X2V4AkbD-0AAtpLjA9y2ssShWLfYu5OOgWftMmm5DRuruN2P3UtUKcgS8dJM7-OKWmSnbGW_UHfaBPYpyCaklxnKHBOGsEtaUwhVGPNEpmafTN1zbDKsd1M6Vcg0rjeFcS49FfvIuaAkmoHTugKzUitREQc_egAk__zEthUuq_sSpQW3VfwMEjzOtlShq_eAYtkY_Xv39z9HSOpZXUUEauUPnizRNoee2vsuC9MS0Cfj1eWgiQ78HfQHkbVd0kAmRid07FwWX2816_yzxhYlXPW4VjYkfGs6iKnUd5ryGJ34wi9uDX7jy_8_LodUQO1vX_yt9tEsAMQ31zwnOTLKd5WiOJwqjBXNTKHM2IsMwQIVSMtXKPVmJFsCXm3fHWt6D39CHk5UtTQ1kCIEdkqCX6qaK6BtqBMrWxkNV3Hk8rSwBlvvIFwHUK7iNKJ0kKSujlCQIOz9AKOgKOBibdUS4LPPiqzHH7ZJYaUvEUurroa0Mb5chl5rOhZMUOzJ1OglRjsJ3JoFMDlAjO3EOBQFEhMm5GQt2QF3c8XQu0COmtTS_jf8hTvNHzO67ln72hYyJC9AAwFVk3tWVzkSP2xGdnHCtkowogod2uEA7hLhaS8dp0SqOz12SNaolXrt0",
        $env: process.env.NODE_ENV
    };
} else {
    config = {
        $api_url: "http://local.mayordomia.nicosli.com",
        $token: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJlYmViZTkzYWEyYTFkM2ZiMWYzNDMwZjQxNGY3NGJkN2Y0NThhMzJmYjQ5NzgzMDI0ODkwNzc4NjJhMTdkODg2YmEzMjUwY2IyYTg2MDIxIn0.eyJhdWQiOiIyIiwianRpIjoiYmViZWJlOTNhYTJhMWQzZmIxZjM0MzBmNDE0Zjc0YmQ3ZjQ1OGEzMmZiNDk3ODMwMjQ4OTA3Nzg2MmExN2Q4ODZiYTMyNTBjYjJhODYwMjEiLCJpYXQiOjE1NjY1MzIzNDgsIm5iZiI6MTU2NjUzMjM0OCwiZXhwIjoxNTk4MTU0NzQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.wEhogLIszgur_QpE63F6UIcQ6_644pGPou2SB3UuozFTqaQ9GFvFzPZNK63TXjDhQ82u1THBrF5W1Q9DctEQm3FPURB6rwalePz8y15EwZzW_fiMp533XDNGqvRuqp5jNMjeT4DtrcyN1SU58SBxbw-wcQcxyha4Q2cOYREb0g-lOHRXaaITcjByKB1nZNVKPKcQ5zlpLL0-m-O9E8PZ36jDaaGRQS2Djmdd9UzXs9NDrH7RM1GqxfCaaw2FzkdQGi_wE_FgO9DFaE1ceJlotthn8rSKE4gij5ND8o4ZCBBTbXSdpgPlq3AutKNhO1u87GFNbFXOMhL5I887esGriuzr9LmdZ9iK05934zcz2E4zv-CIgVzrqZoRYrMtOtstTGj79SKQdwx3yHC93YnxwS-M6ctIDQWuZxCMSbRRFBoDG8rjhm2cWqXrCUtBnQXbg6am3Q_dWLWnWdEI48jEcI7mAKtgYKHzJnOr4tvQWFMuVFj0Mm0vgVNyEiBRQgNfrAmk4rq51bThKX-EUsUPdBE8Ebax7_O0ZacLk4LPPqTsV9fit3XCnUJ4XoQZnOLixvmq2EmUtO9HW11iqOzudKQx_XnN5aUG8QpukIWL26d-vHFD1077FbNQvSysR5tVqshGIENLVwBxQP6D-rmEATPKJBR2qELZaj7xGYz5gPE",
        $env: process.env.NODE_ENV
    };
}

export { config }