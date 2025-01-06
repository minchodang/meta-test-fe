import { setAuthCookie } from '@src/app/actions/setAuthCookie';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_META_TEST_SERVER_HOST_URL}/auth/token`,
            {
                email,
                password,
            },
        );

        const refreshToken = res.headers.refresh_toke;
        const accessToken = res.headers.access_token;

        // // Refresh Token을 HttpOnly 쿠키로 설정 (기간 2주)
        // cookies().set('rtk', refresh_token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24 * 14, // 2주
        //     path: '/',
        //     sameSite: 'strict',
        // });
        // // Refresh Token을 HttpOnly 쿠키로 설정 (기간 2주)
        // cookies().set('atk', accessToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 30, // 30분
        //     path: '/',
        //     sameSite: 'strict',
        // });
        setAuthCookie({ atk: accessToken, rtk: refreshToken });

        // Access Token을 응답 헤더로 클라이언트에 전달
        const response = NextResponse.json({ success: true });
        response.headers.set('Authorization', `Bearer ${accessToken}`);
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
}

export async function PUT(request: NextRequest) {
    const { headers } = await request.json();
    const refreshToken = headers['refreshToken'];

    if (!refreshToken) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_META_TEST_SERVER_HOST_URL}/auth/token/refresh`,
            {
                refresh_token: refreshToken,
            },
        );

        const newAccessToken = res.headers.access_token;
        const newRefreshToken = res.headers.refresh_token;
        // 새로운 Access Token을 응답 헤더로 클라이언트에 전달
        const response = NextResponse.json({ success: true });
        response.headers.set('atk', newAccessToken);
        response.headers.set('rtk', newRefreshToken);
        return response;
    } catch (error) {
        console.log(error, '리이슈');
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
    }
}

export async function DELETE(request: NextRequest) {
    const refreshToken = cookies().get('rtk')?.value;
    const accessToken = cookies().get('atk')?.value;

    if (!refreshToken) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        cookies().delete('rtk');
        cookies().delete('atk');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to logout' }, { status: 401 });
    }
}
