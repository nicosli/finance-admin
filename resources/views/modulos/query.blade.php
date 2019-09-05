@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <table>
        <th>id_pastor</th>
        <th>id_remesa</th>
        <th>id_iglesia</th>
        <th align="center">Nombre</th>
        <th align="center">fecha</th>
        <th align="center">hora</th>
        <th align="center">mes_informe</th>
        <th align="center">anio_informe</th>
        @foreach($res as $us)
            @foreach($fechas as $fecha)    
            <tr>
                <td>{{$us->id_pastor}}</td>
                <td>1</td>
                <td>{{$us->id_iglesia}}</td>
                <td align="center">{{$us->nombre}}</td>
                <td align="center">{{$fecha['fecha']}}</td>
                <td align="center">{{$fecha['hora']}}</td>
                <td align="center">{{$fecha['mes_informe']}}</td>
                <td align="center">{{$fecha['anio_informe']}}</td>
            </tr>
            @endforeach
        @endforeach
    </table>
</div>
@endsection
