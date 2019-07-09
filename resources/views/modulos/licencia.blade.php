@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div class="card">
        <div class="card-content">
            <article class="message is-info">
                <div class="message-body">
                    <strong>Arca System</strong> es propiedad de Nicolás Vicente Navarrete Clemente, se permite el uso
                    libre a la <strong>{{config('licencia.empresa')}}</strong>. No está permitido compartir el código 
                    fuente ni distribuir bajo ninguna circunstancia. 
                </div>
            </article>
        </div>
    </div>
</div>
@endsection
