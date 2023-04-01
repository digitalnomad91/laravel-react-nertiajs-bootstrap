{{-- This file is used to store sidebar items, inside the Backpack admin panel --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>


<!-- Users, Roles, Permissions -->
<li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#"><i class="nav-icon la la-users"></i> Authentication</a>
        <ul class="nav-dropdown-items">
            <li class="nav-item"><a class="nav-link" href="{{ backpack_url('user') }}"><i class="nav-icon la la-user"></i> <span>Users</span></a></li>
            <li class="nav-item"><a class="nav-link" href="{{ backpack_url('role') }}"><i class="nav-icon la la-id-badge"></i> <span>Roles</span></a></li>
            <li class="nav-item"><a class="nav-link" href="{{ backpack_url('permission') }}"><i class="nav-icon la la-key"></i> <span>Permissions</span></a></li>
        </ul>
    </li>


<li class='nav-item'><a class='nav-link' href='{{ backpack_url('page') }}'><i class='nav-icon la la-file-o'></i> <span>Pages</span></a></li>




<link
rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" />
<script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc" crossorigin="anonymous"></script>

<li class="nav-item"><a class="nav-link" href="{{ backpack_url('snippet') }}"><i class="nav-icon la la-code"></i> Snippets</a></li>
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('article') }}"><i class="nav-icon la la-newspaper-o"></i> Blog Posts</a></li>
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('category') }}"><i class="nav-icon la la-list"></i> Categories</a></li>
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('tag') }}"><i class="nav-icon la la-tag"></i> Tags</a></li>


<li class='nav-item'><a class='nav-link' href='/telescope'><i class='nav-icon fa-regular fa-telescope'><svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 264.185 264.185" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M247.543,22.227c-9.9-17.148-30.228-23.811-47.614-17.73c-2.731-4.731-7.255-5.439-10.664-3.471 c-36.672,21.172,1.863-3.276-157.344,102.406c-3.3,2.19-4.328,6.569-2.348,9.999l2.377,4.118l-16.887,9.75 c-3.587,2.071-4.816,6.658-2.745,10.245l17.744,30.735c2.073,3.593,6.666,4.811,10.245,2.745l16.888-9.75l2.378,4.118 c1.98,3.431,6.285,4.728,9.833,2.967l44.1-21.914c-4.55,10.236-43.176,97.126-47.65,107.191c-1.683,3.785,0.021,8.218,3.807,9.9 c3.784,1.683,8.218-0.021,9.9-3.807l16.081-36.174h25.676v33.127c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-33.127h25.676 l16.081,36.174c1.682,3.78,6.107,5.49,9.9,3.807c3.785-1.683,5.489-6.115,3.807-9.9c-1.138-2.56-52.051-117.091-53.191-119.657 c92.152-45.792,64.281-31.115,98.172-50.681c3.192-1.842,5.184-6.021,2.321-10.979C253.269,60.065,257.253,39.045,247.543,22.227z M39.302,154.284l-10.244-17.745l10.392-6l10.245,17.745L39.302,154.284z M121.32,208.556h-19.008l19.008-42.76V208.556z M155.328,208.556H136.32v-42.76L155.328,208.556z M69.041,151.791l-22.954-39.759l121.041-80.348l32.017,55.454L69.041,151.791z M212.377,80.058c-4.704-8.147-27.781-48.118-32.5-56.292l10.393-6l32.5,56.292L212.377,80.058z M231.367,58.948l-23.72-41.083 C231.234,12.623,247.734,41.031,231.367,58.948z"></path> </g> </g> </g></svg></i> <span>Telescope</span></a></li>
<li class='nav-item'><a class='nav-link' href='/horizon'><i class='nav-icon la la-yin-yang'></i> <span>Horizon</span></a></li>
<li class='nav-item'><a class='nav-link' href='/servermonitor'><i class='nav-icon la la-server'></i> <span>Server Monitor</span></a></li>
<li class='nav-item'><a class='nav-link' href='https://cockpit.ioprompts.com'><i class='nav-icon la la-server'></i> <span>Server Management</span></a></li>
<li class='nav-item'><a class='nav-link' href='https://ioprompts.com/phpmyadmin'><i class='nav-icon la la-database'></i> <span>Database Client</span></a></li>
<li class='nav-item'><a class='nav-link' href='/tinker'><i class='nav-icon la la-terminal'></i> <span>Tinker</span></a></li>


<li class='nav-item'><a class='nav-link' href='{{ backpack_url('backup') }}'><i class='nav-icon la la-hdd-o'></i> Backups</a></li>
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('log') }}'><i class='nav-icon la la-files-o'></i> Logs</a></li>
<li class="nav-item"><a class="nav-link" href="/log-viewer"><i class="nav-icon la la-files-o"></i> <span>Log Viewer</span></a></li>
<li class="nav-item"><a class="nav-link" href="/docs"><i class="nav-icon la la-book"></i> <span>Documentation</span></a></li>
<li class='nav-item'><a class='nav-link' href='{{ backpack_url('setting') }}'><i class='nav-icon la la-cog'></i> <span>Settings</span></a></li>

<li class='nav-item'><a class='nav-link' href='https://netdata.ioprompts.com/'><i class='nav-icon la la-signal'></i> <span>Server Statistics</span></a></li>


<li class="nav-item"><a class="nav-link" href="{{ backpack_url('elfinder') }}"><i class="nav-icon la la-file-upload"></i> <span>{{ trans('backpack::crud.file_manager') }}</span></a></li>
<li class="nav-item"><a class="nav-link" href="/admin/routes"><i class="nav-icon la la-link"></i> <span>Site Routes</span></a></li>
