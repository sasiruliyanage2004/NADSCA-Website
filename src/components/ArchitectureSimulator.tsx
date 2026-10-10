"use client";

import React, { useState } from "react";
import Reveal from "./Reveal";

export default function ArchitectureSimulator() {
  const [users, setUsers] = useState<number>(2500);
  const [serverAFailed, setServerAFailed] = useState<boolean>(false);
  const [dbFailed, setDbFailed] = useState<boolean>(false);
  const [rollingUpdate, setRollingUpdate] = useState<boolean>(false);

  // Dynamic user distribution
  const serverAUsers = serverAFailed || rollingUpdate ? 0 : Math.round(users / 2);
  const serverBUsers = serverAFailed || rollingUpdate ? users : Math.round(users / 2);

  // Dynamic failover status text
  const getFailoverStatus = () => {
    if (serverAFailed) return "Server B Active";
    if (dbFailed) return "Replica Promoted";
    if (rollingUpdate) return "Rolling Deploy";
    return "Standing by";
  };

  // Dynamic status message
  const getStatusMessage = () => {
    if (serverAFailed) {
      return "Hardware fault on Server A! API Gateway rerouted 100% of traffic to Server B within milliseconds. Zero dropped requests.";
    }
    if (dbFailed) {
      return "Primary PostgreSQL offline! PostgreSQL 2 promoted to primary instantly. Transaction log replicated with zero data loss.";
    }
    if (rollingUpdate) {
      return "Rolling update in progress: Server A is applying updates while Server B handles live users with zero downtime.";
    }
    return "All systems healthy. Traffic is shared across both servers and the replica database stays in sync. Try a scenario on the left.";
  };

  return (
    <section className="py-24 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="container-content relative z-10">
        
        {/* Header */}
        <Reveal className="max-w-3xl mb-12">
          <span className="text-azure font-mono font-semibold text-xs tracking-widest uppercase mb-3 block">
            RESILIENCE PLAYGROUND • ILLUSTRATIVE SIMULATION
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-ink dark:text-white leading-tight mb-4">
            Break it. We stay online.
          </h2>
          <p className="text-ink/65 dark:text-white/65 text-base md:text-lg leading-relaxed">
            Trigger a failure and watch how our self-hosted platform keeps every request flowing. Add more users, switch off a server, fail over the database, or roll out an update, and nothing stops.
          </p>
        </Reveal>

        {/* Interactive Dashboard Container */}
        <Reveal>
          <div className="rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-ink/8 dark:border-white/10 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-card transition-all">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Controls Column (Col 5) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Control 1: Concurrent Users Slider */}
                <div className="p-5 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono font-semibold text-ink/70 dark:text-white/70 uppercase tracking-wider">
                      CONCURRENT USERS
                    </label>
                    <span className="text-base font-display text-azure font-bold font-mono">
                      {users.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={users}
                    onChange={(e) => setUsers(Number(e.target.value))}
                    className="w-full h-2 bg-ink/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1E7FE8]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-ink/40 dark:text-white/40 mt-2">
                    <span>500</span>
                    <span>5,000</span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Control 2: Switch off a server */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div>
                    <span className="block text-sm font-semibold text-ink dark:text-white">
                      Switch off a server
                    </span>
                    <span className="text-xs text-ink/50 dark:text-white/50">
                      Simulate hardware failure on Server A.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setServerAFailed(!serverAFailed);
                      if (rollingUpdate) setRollingUpdate(false);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      serverAFailed ? "bg-rose-500" : "bg-ink/20 dark:bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        serverAFailed ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Control 3: Fail the primary database */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div>
                    <span className="block text-sm font-semibold text-ink dark:text-white">
                      Fail the primary database
                    </span>
                    <span className="text-xs text-ink/50 dark:text-white/50">
                      Take the main PostgreSQL node offline.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDbFailed(!dbFailed)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      dbFailed ? "bg-rose-500" : "bg-ink/20 dark:bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        dbFailed ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Control 4: Roll out a software update */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div>
                    <span className="block text-sm font-semibold text-ink dark:text-white">
                      Roll out a software update
                    </span>
                    <span className="text-xs text-ink/50 dark:text-white/50">
                      Deploy a new release, one server at a time.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRollingUpdate(!rollingUpdate);
                      if (serverAFailed) setServerAFailed(false);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      rollingUpdate ? "bg-teal" : "bg-ink/20 dark:bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        rollingUpdate ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

              </div>

              {/* Right Column: Resilience Stats & Live Topology (Col 7) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                {/* 3 Metric Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                  
                  {/* Metric 1: Service Status */}
                  <div className="p-4 rounded-2xl bg-paper dark:bg-white/[0.02] border border-ink/5 dark:border-white/5">
                    <span className="text-xs font-mono uppercase text-ink/50 dark:text-white/50 block mb-1">
                      SERVICE STATUS
                    </span>
                    <div className="text-2xl font-display font-bold text-emerald-500">
                      Online
                    </div>
                    <span className="text-xs font-medium text-emerald-500/90 block mt-0.5">
                      No interruption
                    </span>
                  </div>

                  {/* Metric 2: Requests Dropped */}
                  <div className="p-4 rounded-2xl bg-paper dark:bg-white/[0.02] border border-ink/5 dark:border-white/5">
                    <span className="text-xs font-mono uppercase text-ink/50 dark:text-white/50 block mb-1">
                      REQUESTS DROPPED
                    </span>
                    <div className="text-2xl font-display font-bold text-ink dark:text-white">
                      0
                    </div>
                    <span className="text-xs font-mono text-ink/40 dark:text-white/40 block mt-0.5">
                      In this simulation
                    </span>
                  </div>

                  {/* Metric 3: Failover */}
                  <div className="p-4 rounded-2xl bg-paper dark:bg-white/[0.02] border border-ink/5 dark:border-white/5">
                    <span className="text-xs font-mono uppercase text-ink/50 dark:text-white/50 block mb-1">
                      FAILOVER
                    </span>
                    <div className="text-2xl font-display font-bold text-cyan-400">
                      {getFailoverStatus()}
                    </div>
                    <span className="text-xs font-mono text-ink/40 dark:text-white/40 block mt-0.5">
                      No manual action needed
                    </span>
                  </div>

                </div>

                {/* Animated Topology Visualization */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-[#070A10] text-white border border-white/10 shadow-inner">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-white/80 uppercase font-semibold">
                        LIVE TOPOLOGY
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 tracking-wider">
                      ON-PREMISES SERVERS
                    </span>
                  </div>

                  {/* Topology 5-Column Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10 mb-5">
                    
                    {/* Column 1: USERS */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-white/40 mb-2 text-center">
                        USERS
                      </span>
                      <div className="h-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center flex flex-col justify-center">
                        <div className="font-mono text-xs font-bold text-white mb-0.5">Clients</div>
                        <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE
                        </div>
                        <div className="text-[10px] font-mono text-white/50 mt-1">
                          {users.toLocaleString()} online
                        </div>
                      </div>
                    </div>

                    {/* Column 2: GATEWAY */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-white/40 mb-2 text-center">
                        GATEWAY
                      </span>
                      <div className="h-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center flex flex-col justify-center">
                        <div className="font-mono text-xs font-bold text-white mb-0.5">API Gateway</div>
                        <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE
                        </div>
                        <div className="text-[10px] font-mono text-cyan-300/80 mt-1">
                          Verify and route
                        </div>
                      </div>
                    </div>

                    {/* Column 3: APP SERVERS (Server A & Server B stacked) */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-white/40 mb-2 text-center">
                        APP SERVERS
                      </span>
                      <div className="space-y-2">
                        {/* Server A */}
                        <div className={`p-2 rounded-lg border text-center transition-all ${
                          serverAFailed
                            ? "bg-rose-500/10 border-rose-500/40"
                            : rollingUpdate
                            ? "bg-amber-500/10 border-amber-500/40"
                            : "bg-white/[0.03] border-white/10"
                        }`}>
                          <div className="font-mono text-[11px] font-semibold text-white">Server A</div>
                          <div className={`text-[9px] font-mono font-semibold flex items-center justify-center gap-1 ${
                            serverAFailed ? "text-rose-400" : rollingUpdate ? "text-amber-400" : "text-emerald-400"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              serverAFailed ? "bg-rose-400" : rollingUpdate ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                            }`} />
                            {serverAFailed ? "OFFLINE" : rollingUpdate ? "UPDATING" : "ACTIVE"}
                          </div>
                          <div className="text-[9px] font-mono text-white/50 mt-0.5">
                            {serverAUsers.toLocaleString()} users
                          </div>
                        </div>

                        {/* Server B */}
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                          <div className="font-mono text-[11px] font-semibold text-white">Server B</div>
                          <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-center gap-1 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE
                          </div>
                          <div className="text-[9px] font-mono text-white/50 mt-0.5">
                            {serverBUsers.toLocaleString()} users
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 4: DATABASE (PostgreSQL 1 & PostgreSQL 2 stacked) */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-white/40 mb-2 text-center">
                        DATABASE
                      </span>
                      <div className="space-y-2">
                        {/* PostgreSQL 1 */}
                        <div className={`p-2 rounded-lg border text-center transition-all ${
                          dbFailed
                            ? "bg-rose-500/10 border-rose-500/40"
                            : "bg-white/[0.03] border-white/10"
                        }`}>
                          <div className="font-mono text-[11px] font-semibold text-white">PostgreSQL 1</div>
                          <div className={`text-[9px] font-mono font-semibold flex items-center justify-center gap-1 ${
                            dbFailed ? "text-rose-400" : "text-emerald-400"
                          }`}>
                            {dbFailed ? "OFFLINE" : "PRIMARY"}
                          </div>
                          <div className="text-[9px] font-mono text-white/50 mt-0.5">
                            {dbFailed ? "Standby failed" : "Writing data"}
                          </div>
                        </div>

                        {/* PostgreSQL 2 */}
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                          <div className="font-mono text-[11px] font-semibold text-white">PostgreSQL 2</div>
                          <div className={`text-[9px] font-mono font-semibold flex items-center justify-center gap-1 ${
                            dbFailed ? "text-emerald-400" : "text-cyan-400"
                          }`}>
                            {dbFailed ? "PRIMARY" : "IN SYNC"}
                          </div>
                          <div className="text-[9px] font-mono text-white/50 mt-0.5">
                            {dbFailed ? "Promoted & active" : "Copying data"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 5: ASSISTANT */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-mono uppercase text-white/40 mb-2 text-center">
                        ASSISTANT
                      </span>
                      <div className="h-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center flex flex-col justify-center">
                        <div className="font-mono text-xs font-bold text-white mb-0.5">AVORA_AI</div>
                        <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE
                        </div>
                        <div className="text-[10px] font-mono text-white/50 mt-1">
                          Answering live
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Notification Alert Banner */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <span className="shrink-0">⚡</span>
                    <span className="leading-relaxed">
                      {getStatusMessage()}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
