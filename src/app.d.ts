// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare global {

    interface Window { emulator: V86Starter; }

   /** set when v86 is built with debug mode enabled */
    export const DEBUG: boolean;

    export type V86Image = 
    | { url: string } 
    | { buffer: ArrayBuffer }
    | { url: string, async: false, size?: number }
    | { url: string, async: true, size: number }

    /**
     * A 9p filesystem is supported by the emulator, using a virtio transport. Using it, files can be exchanged with the guest OS
     * If `basefs` and `baseurl` are omitted, an empty 9p filesystem is created.
     */
    export interface Filesystem9pOptions {
    /**
     * json file created using [fs2json](https://github.com/copy/v86/blob/master/tools/fs2json.py). 
     */
    baseurl?: string,
    
    /**
     * The base url is the prefix of a url from which the files are available. 
     * For instance, if the 9p filesystem has a file `/bin/sh`, that file must be accessible from http://localhost/9p/base/bin/sh
     */
    basefs?: string
    }

    export enum LogLevel {
    LOG_ALL =    -1,
    LOG_NONE =   0,
    LOG_OTHER =  0x000001,
    LOG_CPU =    0x000002,
    LOG_FPU =    0x000004,
    LOG_MEM =    0x000008,
    LOG_DMA =    0x000010,
    LOG_IO =     0x000020,
    LOG_PS2 =    0x000040,
    LOG_PIC =    0x000080,
    LOG_VGA =    0x000100,
    LOG_PIT =    0x000200,
    LOG_MOUSE =  0x000400,
    LOG_PCI =    0x000800,
    LOG_BIOS =   0x001000,
    LOG_FLOPPY = 0x002000,
    LOG_SERIAL = 0x004000,
    LOG_DISK =   0x008000,
    LOG_RTC =    0x010000,
    LOG_HPET =   0x020000,
    LOG_ACPI =   0x040000,
    LOG_APIC =   0x080000,
    LOG_NET =    0x100000,
    LOG_VIRTIO = 0x200000,
    LOG_9P =     0x400000,
    LOG_SB16 =   0x800000
    } 

    export enum BootOrder {
    CD_FLOPPY_HARDDISK = 0x213,
    CD_HARDDISK_FLOPPY = 0x123,
    FLOPPY_CD_HARDDISK = 0x231,
    FLOPPY_HARDDISK_CD = 0x321,
    HARDDISK_CD_FLOPPY = 0x132
    }

    export interface BusListener {
        fn: Function
        this_value: V86
    }

    export class BusConnector {
    constructor()

    pair: BusConnector
    listeners: {
        [eventName: string]: Array<BusListener>,
    }
    
    /**
     * @param {string} name
     * @param {function(?)} fn
     * @param {Object} this_value
     */
    register(name: string, fn: Function, this_value: Object): void

    /**
     * Unregister one message with the given name and callback
     *
     * @param {string} name
     * @param {function()} fn
     */
    unregister(name: string, fn: Function): void

    /**
     * Send ("emit") a message
     *
     * @param {string} name
     * @param {*=} value
     * @param {*=} unused_transfer
     */
    send(name: string, value: any, unused_transfer?: any): void

    /**
     * Send a message, guaranteeing that it is received asynchronously
     *
     * @param {string} name
     * @param {Object=} value
     */
    send_async(name: string, value: any): void
    }

    /**
     * Custom emulated ethernet card adapter (pass in V86StarterOptions)
     * @see https://github.com/copy/v86/blob/master/src/browser/network.js
     */
    export class NetworkAdapter {
    constructor(bus: BusConnector)

    handle_message(event: any & { data: string | ArrayBufferLike | Blob | ArrayBufferView }): void
    handle_close(event: any): void
    handle_open(event: any): void
    handle_error(event: any): void
    destroy(event: any): void
    connect(): void
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void
    change_proxy(url: string): void
    }

    export type V86AutomaticStep =
    | { 
        /** wait for x seconds */ 
        sleep: number
    } 
    | { 
        /** wait until vga_text is present on the screen */
        vga_text: string 
    } 
    | { 
        /** text or scancodes to send */
        keyboard_send: number[] | string 
    } 
    | {
        /** callback to execute */
        call: () => void 
    }

    export interface BIOS {
        main: ArrayBuffer
        vga: ArrayBuffer
    }

    export interface PackedMemory {
        bitmap: Uint8Array
        packed_memory: Uint8Array
    }

    export class CPU {
        wm: {
            exports: WebAssembly.Exports,
            wasm_table: WebAssembly.Table,
        }
        wasm_memory: WebAssembly.Memory
        memory_size: Uint32Array

        mem8: Uint8Array
        mem32s: Int32Array
        
        segment_is_null: Uint8Array
        segment_offsets: Int32Array
        segment_limits: Uint32Array

        /**
         * Wheter or not in protected mode
         */
        protected_mode: Int32Array

        idtr_size: Int32Array
        idtr_offset: Int32Array

        /**
         * global descriptor table register
         */
        gdtr_size: Int32Array
        gdtr_offset: Int32Array

        tss_size_32: Int32Array

        /*
        * whether or not a page fault occured
        */
        page_fault: Uint32Array
        cr: Int32Array

        // current privilege level
        cpl: Uint8Array

        // current operand/address size
        is_32: Int32Array

        stack_size_32: Int32Array

        /**
         * Was the last instruction a hlt?
         */
        in_hlt: Uint8Array

        last_virt_eip: Int32Array
        eip_phys: Int32Array

        sysenter_cs: Int32Array
        sysenter_esp: Int32Array
        sysenter_eip: Int32Array

        prefixes: Int32Array
        flags: Int32Array

        /**
         * bitmap of flags which are not updated in the flags variable
         * changed by arithmetic instructions, so only relevant to arithmetic flags
         */
        flags_changed: Int32Array

        /**
         * enough infos about the last arithmetic operation to compute eflags
         */
        last_op1: Int32Array
        last_op_size: Int32Array
        last_result: Int32Array

        current_tsc: Uint32Array

        instruction_pointer: Int32Array
        previous_ip: Int32Array

        /**
         * configured by guest
         */
        apic_enabled: Uint8Array

        /**
         * configured when the emulator starts (changes bios initialisation)
         */
        acpi_enabled: Uint8Array

        bios: BIOS

        instruction_counter: Uint32Array

        reg32: Int32Array

        fpu_st: Int32Array

        fpu_stack_empty: Uint8Array

        fpu_stack_ptr: Uint8Array

        fpu_control_word: Uint16Array

        fpu_status_word: Uint16Array

        fpu_ip: Int32Array

        fpu_ip_selector: Int32Array

        fpu_opcode: Int32Array

        fpu_dp: Int32Array

        fpu_dp_selector: Int32Array

        reg_xmm32s: Int32Array
        mxcsr: Int32Array

        /**
         * segment registers, tr and ldtr
         */
        sreg: Uint16Array

        /**
         * Debug registers
         */
        dreg: Int32Array

        reg_pdpte: Int32Array

        svga_dirty_bitmap_min_offset: Uint32Array
        svga_dirty_bitmap_max_offset: Uint32Array

        /**
         * Firmware id value 
         */
        fw_value: Int32Array

        fw_pointer: number  

        bus: BusConnector

        do_many_cycles_count?: number
        do_many_cycles_total?: number
        seen_code?: Object
        seen_code_uncompiled?: Object

        get_state: () => Array<number|ArrayBuffer>
        set_state: (state: Array<number|ArrayBuffer>) => void
        pack_memory: () => PackedMemory
        unpack_memory: (bitmap: Uint8Array, packed_memory: Uint8Array) => void
        main_run: () => number
        reboot_internal: () => void
        reset_memory: () => void
        create_memory: (size: number) => void
        hlt_loop: () => void
        hlt_op: () => void     
    }

    export class V86 {
        /**
         * Set true when the CPU is in idle state
         */
        idle: boolean
        cpu: CPU
        running: boolean
        stopped: boolean
        tick_counter: boolean
        bus: BusConnector
        worker: Worker
    }

    /**
     * emulator instance constructor options.
     */
    export interface V86StarterOptions {
    
    /**
     * Reference to the v86 wasm exorted function.
     * @default undefined 
     */
    wasm_fn: (options: WebAssembly.Imports) => Promise<WebAssembly.Exports>

    /**
     * Path to v86 wasm artifact
     * @default "build/v86.wasm" or "build/v86-debug.wasm" when debug mode enabled 
     */
    wasm_path?: string

    /**
     * The memory size in bytes, should be a power of 2.
     * @example 16 * 1024 * 1024
     * @default 64 * 1024 * 1024
     */
    memory_size?: number

    /**
     * VGA memory size in bytes.
     * @example 8 * 1024 * 1024
     * @default 8 * 1024 * 1024
     */
    vga_memory_size?: number

    /**
     * If emulation should be started when emulator is ready.
     * @default false 
     */
    autostart?: boolean

    /**
     * If keyboard should be disabled.
     * @default false
     */
    disable_keyboard?: boolean

    /**
     * If mouse should be disabled.
     * @default false
     */
    disable_mouse?: boolean

    /**
     * If speaker should be disabled.
     * @default false
     */
    disable_speaker?: boolean

    /**
     * The url of a server running websockproxy. See [networking.md](networking.md). Setting this will enable an emulated network card.
     * @default undefined
     */
    network_relay_url?: string

    /**
     * Either a url pointing to a bios or an ArrayBuffer, see below.
     * @default undefined
     */
    bios?: V86Image

    /**
     * VGA bios, see below.
     * @default undefined
     */
    vga_bios?: V86Image

    /**
     * First hard disk, see below.
     * @default undefined
     */
    hda?: V86Image

    /** 
     * First floppy disk, see below.
     * @default undefined
     */
    fda?: V86Image

    /** 
     * cdrom
     * @default undefined
     */
    cdrom?: V86Image

    /**
     * A Linux kernel image to boot (only bzimage format)
     * @default undefined
     */
    bzimage?: V86Image

    /**
     * A Linux ramdisk image
     * @default undefined
     */
    initrd?: V86Image

    /**
     * Automatically fetch bzimage and initrd from the specified `filesystem`.
     */
    bzimage_initrd_from_filesystem?: boolean

    /**
     * An initial state to load
     * @default undefined
     */
    initial_state?: V86Image

    /**
     * A 9p filesystem
     * @default undefined
     */
    filesystem?: Filesystem9pOptions

    /** 
     * A textarea that will receive and send data to the emulated serial terminal.
     * Alternatively the serial terminal can also be accessed programatically, see [serial.html](../examples/serial.html).  
     * @default undefined
     */
    serial_container?: HTMLTextAreaElement

    /**
     * Xtermjs serial terminal container. When set, serial_container option is ignored.
     * @default undefined
     */
    serial_container_xtermjs?: HTMLElement

    /**
     * An HTMLElement. This should have a certain structure, see [basic.html](../examples/basic.html).
     * @default undefined
     */
    screen_container?: HTMLElement | null

    /**
     * ACPI
     * @default false
     */
    acpi?: boolean

    /**
     * log level
     * @default LogLevel.LOG_NONE
     */
    log_level?: LogLevel

    /**
     * boot order
     * @default BootOrder.CD_FLOPPY_HARDDISK
     */
    boot_order?: BootOrder

    /**
     * fast boot
     * @default false
     */
    fastboot?: boolean

    /**
     * enables UART1 (Serial port)
     * @see http://wiki.osdev.org/UART
     * @see https://github.com/s-macke/jor1k/blob/master/js/worker/dev/uart.js
     * @see https://www.freebsd.org/doc/en/articles/serial-uart/
     * @default undefined
     */
    uart1?: boolean

    /**
     * enables UART2 (Serial port)
     * @see http://wiki.osdev.org/UART
     * @see https://github.com/s-macke/jor1k/blob/master/js/worker/dev/uart.js
     * @see https://www.freebsd.org/doc/en/articles/serial-uart/
     * @default undefined
     */
    uart2?: boolean

    /**
     * enables UART3 (Serial port)
     * @see http://wiki.osdev.org/UART
     * @see https://github.com/s-macke/jor1k/blob/master/js/worker/dev/uart.js
     * @see https://www.freebsd.org/doc/en/articles/serial-uart/
     * @default undefined
     */
    uart3?: boolean

    /**
     * boot cmdline 
     */
    cmdline?: string

    /**
     * Ne2k: should MAC be preserved from the state image
     * @default undefined
     */
    preserve_mac_from_state_image?: boolean  

    /**
     * custom network adapter
     * @default undefined
     */
    network_adapter?: NetworkAdapter

    /**
     * enables screen dummy
     * @default undefined
     */
    screen_dummy?: boolean
    }

    export class V86Starter {
    constructor(options?: V86StarterOptions)

    /**
     * bus, use it when you must (there are a few wrappers on top of it in V86Starter that you might find helpful instead)
     */
    bus: BusConnector

    /**
     * The v86 instance.
     */
    v86: V86

    /**
     * Start emulation. Do nothing if emulator is running already. Can be asynchronous.
     */
    run(): void

    /**
     * Stop emulation. Do nothing if emulator is not running. Can be asynchronous.
     */
    stop(): void
    destroy(): void

    /**
     * Restart (force a reboot).
     */
    restart(): void

    /**
     * Add an event listener (the emulator is an event emitter). A list of events
     * can be found at [events.md](events.md).
     *
     * The callback function gets a single argument which depends on the event.
     *
     * @param event Name of the event.
     * @param listener The callback function.
     */
    add_listener(event: string, listener: Function): void

    /**
     * Remove an event listener.
     *
     * @param event
     * @param listener
     */
    remove_listener(event: string, listener: Function): void

    /**
     * Restore the emulator state from the given state, which must be an
     * ArrayBuffer returned by
     * [`save_state`](#save_statefunctionobject-arraybuffer-callback).
     *
     * Note that the state can only be restored correctly if this constructor has
     * been created with the same options as the original instance (e.g., same disk
     * images, memory size, etc.).
     *
     * Different versions of the emulator might use a different format for the
     * state buffer.
     *
     * @param state
     */
    restore_state(state: ArrayBuffer): void

    /**
     * Asynchronously save the current state of the emulator. The first argument to
     * the callback is an Error object if something went wrong and is null
     * otherwise.
     *
     * @param callback
     */
    save_state(callback: (error: Object | null, state: ArrayBuffer) => void): void

    /**
     * Return an object with several statistics. Return value looks similar to
     * (but can be subject to change in future versions or different
     * configurations, so use defensively):
     *
     * ```javascript
     * {
     *     "cpu": {
     *         "instruction_counter": 2821610069
     *     },
     *     "hda": {
     *         "sectors_read": 95240,
     *         "sectors_written": 952,
     *         "bytes_read": 48762880,
     *         "bytes_written": 487424,
     *         "loading": false
     *     },
     *     "cdrom": {
     *         "sectors_read": 0,
     *         "sectors_written": 0,
     *         "bytes_read": 0,
     *         "bytes_written": 0,
     *         "loading": false
     *     },
     *     "mouse": {
     *         "enabled": true
     *     },
     *     "vga": {
     *         "is_graphical": true,
     *         "res_x": 800,
     *         "res_y": 600,
     *         "bpp": 32
     *     }
     * }
     * ```
     *
     * @deprecated
     */
    get_statistics(): Object
    get_instruction_counter(): number
    is_running(): boolean

    /**
     * Send a sequence of scan codes to the emulated PS2 controller. A list of
     * codes can be found at http://stanislavs.org/helppc/make_codes.html.
     * Do nothing if there is no keyboard controller.
     *
     * @param codes
     */
    keyboard_send_scancodes(codes: number[]): void
    
    /**
     * Send translated keys
     */
    keyboard_send_keys(codes: any[]): void

    /**
     * Send text
     */
    keyboard_send_text(string: string): void

    
    /**
     * Download a screenshot.
     */
    screen_make_screenshot(): void

    /**
     * Set the scaling level of the emulated screen.
     *
     * @param {number} sx
     * @param {number} sy
     *
     * @ignore
     * @export
     */
    screen_set_scale(sx: number, sy: number): void

    /**
     * Go fullscreen.
     */
    screen_go_fullscreen(): void

    /**
     * Lock the mouse cursor: It becomes invisble and is not moved out of the browser window.
     */
    lock_mouse(): void

    /**
     * Enable or disable sending mouse events to the emulated PS2 controller.
     */
    mouse_set_status(enabled: boolean): void
    
    /**
     * Enable or disable sending keyboard events to the emulated PS2 controller.
     */
    keyboard_set_status(enabled: boolean): void

    /**
     * Send a string to the first emulated serial terminal.
     *
     * @param data
     */
    serial0_send(data: string): void

    /**
     * Send bytes to a serial port (to be received by the emulated PC).
     *
     * @param serial the index of the serial port
     * @param data
     */
    serial_send_bytes(serial: number, data: Uint8Array): void

    /**
     * Mount another filesystem to the current filesystem.
     * @param path Path for the mount point
     * @param baseurl
     * @param basefs As a JSON string
     * @param callback
     * @export
     */
    mount_fs(path: string, baseurl?: string, basefs?: string, callback?: (error: Object | null) => void): void

    /**
     * Write to a file in the 9p filesystem. Nothing happens if no filesystem has
     * been initialized. First argument to the callback is an error object if
     * something went wrong and null otherwise.
     *
     * @param file
     * @param data
     * @param callback
     */
    create_file(file: string, data: Uint8Array, callback?: (error: Object | null) => void): void

    /**
     * Runs a set of automatic steps
     * @param steps
     */
    automatically(steps: V86AutomaticStep[]): void

    /**
     * Reads data from memory at specified offset.
     *
     * @param offset
     * @param length
     */
    read_memory(offset: number, length: number): Array<number> | Uint8Array

    /**
     * Writes data to memory at specified offset.
     *
     * @param {Array.<number>|Uint8Array} blob
     * @param {number} offset
     */
    write_memory(blob: Array<number> | Uint8Array, offset: number): void
    }
}
export {};
